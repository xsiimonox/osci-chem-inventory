(function () {
    'use strict';
    const modes = ['default', 'light', 'girl', 'mint', 'badman'];
    const properties = ['--accent','--accent-contrast','--primary','--accent-strong','--secondary','--app-bg','--nav-bg','--surface-card','--surface-raised','--surface-overlay','--border-color','--bg','--card-bg','--border','--focus-ring'];
    const normalizeColor = value => /^#[0-9a-f]{6}$/i.test(String(value || '').trim()) ? String(value).trim() : '';
    function luminance(color) {
        const channels = color.slice(1).match(/../g).map(channel => {
            const value = parseInt(channel, 16) / 255;
            return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
        });
        return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
    }
    function clearColors(target) {
        if (target?.style) properties.forEach(property => target.style.removeProperty(property));
    }
    function setColors(target, colors = {}) {
        if (!target?.style) return;
        clearColors(target);
        const primary = normalizeColor(colors.primary) || normalizeColor(colors.secondary);
        if (!primary) return;
        const brightness = luminance(primary);
        const darkContrast = (brightness + .05) / (luminance('#101719') + .05);
        const whiteContrast = 1.05 / (brightness + .05);
        const ink = darkContrast >= 4.5 ? '#101719' : whiteContrast >= 4.5 ? '#ffffff' : '#000000';
        target.style.setProperty('--accent', primary);
        target.style.setProperty('--primary', primary);
        target.style.setProperty('--secondary', normalizeColor(colors.secondary) || primary);
        target.style.setProperty('--accent-strong', `color-mix(in srgb, ${primary} 86%, ${ink === '#ffffff' ? '#000000' : '#ffffff'})`);
        target.style.setProperty('--accent-contrast', ink);
        target.style.setProperty('--focus-ring', `0 0 0 3px color-mix(in srgb, ${primary} 38%, transparent)`);
    }
    function setMode(value) {
        const mode = modes.includes(value) ? value : 'default';
        [document.documentElement, document.body].filter(Boolean).forEach(element => {
            element.classList.remove(...modes.filter(name => name !== 'default').map(name => `theme-${name}`));
            if (mode !== 'default') element.classList.add(`theme-${mode}`);
        });
        const background = getComputedStyle(document.documentElement).getPropertyValue('--app-bg').trim();
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', background || '#101719');
    }
    function pageUrl(file, mode, colors = {}, embedded = false) {
        const url = new URL(file, location.href);
        url.searchParams.set('theme', modes.includes(mode) ? mode : 'default');
        ['primary','secondary'].forEach(name => {
            const color = normalizeColor(colors[name]);
            if (color) url.searchParams.set(name, color); else url.searchParams.delete(name);
        });
        if (embedded) url.searchParams.set('embed', 'app-modal');
        return url.href;
    }
    function updateLinks(mode, colors, embedded = false) {
        document.querySelectorAll('.app-footer a,.legal-links a,[data-help-page],a[href*="wave/demo.html"]').forEach(link => {
            const url = new URL(link.getAttribute('href'), location.href);
            const known = /\/(?:anleitung|impressum|privacy)\.html$|\/wave\/demo\.html$/.test(url.pathname);
            if (known && url.origin === location.origin) link.href = pageUrl(url.href, mode, colors, embedded);
        });
    }
    window.ReefTheme = { setMode, setColors, clearColors, pageUrl, updateLinks };
    if (!document.currentScript?.hasAttribute('data-theme-page')) return;
    const params = new URLSearchParams(location.search);
    let storedMode = 'default', colors = {};
    try {
        storedMode = localStorage.getItem('reeftools_theme_v1') || 'default';
        const parsed = JSON.parse(localStorage.getItem('reeftools_custom_theme_colors_v1') || '{}');
        colors = { primary: normalizeColor(parsed?.primary), secondary: normalizeColor(parsed?.secondary) };
    } catch {}
    const requested = params.get('theme');
    const mode = modes.includes(requested) ? requested : storedMode;
    ['primary','secondary'].forEach(name => {
        const color = normalizeColor(params.get(name));
        if (color) colors[name] = color;
    });
    setMode(mode);
    setColors(document.documentElement, colors);
    document.addEventListener('DOMContentLoaded', () => {
        setMode(mode);
        setColors(document.body, colors);
        const embedded = params.get('embed') === 'app-modal';
        if (embedded) {
            document.documentElement.classList.add('legal-embedded');
            if (document.body.classList.contains('guide-page')) document.documentElement.classList.add('guide-embedded');
        }
        updateLinks(mode, colors, embedded);
    });
})();
