"""One-time structured migration of legacy visual declarations to Reef Lab tokens.

Run with tinycss2 installed. Feature layout, visibility and data visualization geometry
are retained. New component appearance belongs to design-system.css.
"""
from pathlib import Path
import argparse
import re
import tinycss2

parser = argparse.ArgumentParser()
parser.add_argument('--apply', action='store_true')
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
stats = {'tokenized': 0, 'removed_theme_rules': 0, 'deduplicated': 0, 'removed_chrome_rules': 0}
protected = re.compile(r'party|confetti|cursor-(?:layer|ring|dot|glow|crosshair|emoji|trail|preview)|lighting-cluster-marker|coral-placement-(?:marker|canvas)|trade-showcase-(?:stage|canvas)|keyframe', re.I)
chrome = re.compile(r'#(?:appHeader|main-nav)\b|\.(?:header-[\w-]+|nav-menu[\w-]*|nav-links|mobile-bottom-nav|menu-toggle|close-menu|global-search-trigger|subtitle|version-badge|community-project[\w-]*|settings-page-actions|settings-help-link|settings-assistant-link|settings-showcase-link)\b|^header(?:\s|$)')
semantic_vars = {'--app-bg', '--nav-bg', '--surface-card', '--surface-raised', '--surface-overlay', '--border-color', '--text-primary', '--text-secondary', '--accent', '--accent-strong', '--accent-contrast', '--status-success', '--status-warning', '--status-danger', '--bg', '--card-bg', '--primary', '--secondary', '--text', '--text-muted', '--danger', '--success', '--warning', '--border', '--radius-sm', '--radius-md', '--radius-lg', '--radius-pill', '--radius-card', '--radius-control', '--shadow-subtle', '--shadow-raised', '--shadow-overlay', '--shadow-sm', '--shadow-md', '--shadow-lg', '--shadow-soft', '--focus-ring'}
semantic_vars.update({f'--space-{index}' for index in range(1, 8)})
semantic_vars.update({'--font-caption','--font-small','--font-body','--font-section','--font-heading','--font-value','--header-height','--nav-width','--mobile-nav-height','--content-max','--safe-top','--safe-bottom','--stock-empty','--stock-critical','--stock-warning','--stock-optimal'})

def state_token(selector):
    if re.search(r'danger|critical|missing|error|warning', selector):
        return '--status-warning' if 'warning' in selector else '--status-danger'
    if re.search(r'success|optimal|status-ok', selector): return '--status-success'
    return '--accent'

def migrate(rules, ancestry=''):
    kept = []
    for rule in rules:
        if rule.type == 'at-rule' and rule.content is not None:
            keyword = rule.lower_at_keyword
            if keyword in ('media', 'supports', 'layer', 'container'):
                children = tinycss2.parse_rule_list(rule.content, skip_whitespace=False, skip_comments=False)
                rule.content = tinycss2.parse_component_value_list(migrate(children, ancestry + keyword))
            kept.append(rule)
            continue
        if rule.type != 'qualified-rule':
            kept.append(rule)
            continue
        selector = tinycss2.serialize(rule.prelude).strip()
        if protected.search(selector + ancestry):
            kept.append(rule)
            continue
        selectors = [part.strip() for part in selector.split(',')]
        if all(chrome.search(part) for part in selectors) and not re.search(r'menu-open|nav-tab-disabled', selector):
            stats['removed_chrome_rules'] += 1
            continue
        declarations = tinycss2.parse_declaration_list(rule.content, skip_whitespace=True, skip_comments=True)
        theme = bool(re.search(r'(?:body|html)\.theme-', selector))
        new = []
        for decl in declarations:
            if decl.type != 'declaration': continue
            prop, value = decl.lower_name, tinycss2.serialize(decl.value).strip()
            if selector == 'body' and (prop == 'display' and value == 'grid' or prop in ('grid-template-columns', 'align-content')):
                continue
            if selector == 'body' and prop == 'padding-bottom':
                continue
            if prop == 'animation' and not re.search(r'loading|spinner|busy|pulse|transfer|toast|progress|blink', selector):
                continue
            if re.search(r'\.design-reveal\b', selector) and prop in ('opacity','transform','transition'):
                continue
            if decl.name in semantic_vars:
                stats['tokenized'] += 1
                continue
            if theme and prop in ('background', 'background-color', 'background-image', 'box-shadow', 'text-shadow', 'color', 'border', 'border-color', 'border-radius', 'filter', 'backdrop-filter', '-webkit-backdrop-filter'):
                stats['removed_theme_rules'] += 1
                continue
            before = value
            if prop == 'border-radius' and value not in ('0', '0px', '50%'):
                value = 'var(--radius-md)'
            elif prop in ('box-shadow', 'text-shadow'):
                value = 'none'
            elif prop in ('backdrop-filter', '-webkit-backdrop-filter'):
                value = 'none'
            elif prop == 'letter-spacing': value = '0'
            elif prop == 'font-weight' and value.isdigit() and int(value) > 600: value = '600'
            elif prop == 'font-size' and ('clamp(' in value or 'vw' in value):
                value = 'var(--font-heading)' if re.search(r'\bh[12]\b', selector) else 'var(--font-body)'
            elif prop == 'font-size' and re.fullmatch(r'0?\.\d+rem', value) and float(value[:-3]) < .75:
                value = 'var(--font-caption)'
            elif prop == 'background-image' and 'gradient(' in value: value = 'none'
            elif prop in ('background', 'background-color'):
                if 'gradient(' in value: value = 'var(--surface-card)'
                elif re.search(r'#[\da-fA-F]{3,8}\b|rgba?\(', value):
                    if re.search(r'progress|bar|meter|fill|dot|indicator|slider|mark', selector): value = 'var(' + state_token(selector) + ')'
                    elif ':hover' in selector or '.active' in selector or 'aria-pressed' in selector: value = 'var(--surface-raised)'
                    elif 'backdrop' in selector or re.search(r'\.modal\s*$', selector): value = 'var(--overlay-backdrop)'
                    else: value = 'var(--surface-card)'
            elif prop == 'color' and re.search(r'#[\da-fA-F]{3,8}\b|rgba?\(|\b(white|black)\b', value):
                value = 'var(' + (state_token(selector) if re.search(r'danger|warning|success|error|critical|optimal', selector) else '--text-primary') + ')'
            elif (prop.startswith('border') or prop == 'outline') and re.search(r'#[\da-fA-F]{3,8}\b|rgba?\(', value):
                components = tinycss2.parse_component_value_list(value)
                replaced = []
                for token in components:
                    if token.type == 'hash' or token.type == 'function' and token.lower_name in ('rgb', 'rgba'):
                        replaced.extend(tinycss2.parse_component_value_list('var(--border-color)'))
                    else: replaced.append(token)
                value = tinycss2.serialize(replaced)
            if ':hover' in selector or ':active' in selector:
                if prop == 'transform' and re.search(r'translate|scale', value): value = 'none'
            # Visual ownership now lives in the shared component stylesheet.
            visual = prop in ('color','background','background-color','background-image','border','border-color','border-radius','box-shadow','text-shadow','font-size','font-weight','letter-spacing','transition','outline','outline-offset')
            is_control = bool(re.search(r'\bbutton\b|\binput\b|\bselect\b|\btextarea\b|\.btn[-\w]*\b', selector))
            is_surface = bool(re.search(r'\.card(?:[\s.:,#>]|$)|\.modal-content|\.app-dialog-panel', selector))
            if visual and (is_control or is_surface):
                # Shared styles replace presentation, while layout declarations stay here.
                stats['tokenized'] += 1
                continue
            decl.value = tinycss2.parse_component_value_list(value)
            if value != before:
                stats['tokenized'] += 1
            if prop in ('color','background','background-color','border-color','border-radius','box-shadow','font-weight','font-size','letter-spacing'):
                decl.important = False
            new.append(decl)
        if new:
            rule.content = tinycss2.parse_component_value_list('\n    ' + '\n    '.join(tinycss2.serialize([decl]) for decl in new) + '\n')
            kept.append(rule)
    # Exact duplicate rules within this scope only; media ordering remains intact.
    seen = set()
    for rule in reversed(kept):
        if rule.type != 'qualified-rule': continue
        key = tinycss2.serialize([rule])
        if key in seen:
            kept.remove(rule)
            stats['deduplicated'] += 1
        else: seen.add(key)
    return tinycss2.serialize(kept)

for relative in ('assets/css/style.css', 'assets/css/workspace-ui.css'):
    path = root / relative
    source = path.read_text()
    rules = tinycss2.parse_stylesheet(source, skip_whitespace=False, skip_comments=False)
    errors = [rule for rule in rules if rule.type == 'error']
    if errors: raise ValueError(f'{relative}: CSS parse errors: {errors}')
    result = migrate(rules)
    if args.apply: path.write_text(result)
    print(f'{relative}: {len(source)} -> {len(result)} characters')
print(stats)
