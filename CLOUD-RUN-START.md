# ReefTools: Cloud-Run-Start am naechsten Tag

Diese Checkliste bereitet den Start des serverseitigen Google-Logins vor.

## 1. Einmalig in Google Cloud

Projekt: `reeftools-sync`

Aktivieren:

- Cloud Run Admin API
- Cloud Build API
- Artifact Registry API
- Secret Manager API
- Firestore API

In Firestore eine Datenbank im **Native mode** anlegen. Als Standort die
Cloud-Run-Region verwenden, zum Beispiel `europe-west1`.

## 2. OAuth-Client

In Google Auth Platform einen OAuth-Client vom Typ **Webanwendung** anlegen.

Autorisierte JavaScript-Quelle:

```text
https://reeftools.de
```

Autorisierte Rückgabe-URL:

```text
https://reeftools.de/auth/google/callback
```

## 3. Secrets erzeugen

Im Terminal zwei zufällige Werte erzeugen:

```bash
openssl rand -base64 32
openssl rand -base64 32
```

Der erste Wert ist `SESSION_SECRET`, der zweite `TOKEN_ENCRYPTION_KEY`.

In Secret Manager anlegen:

- `google-oauth-client-secret`
- `reeftools-session-secret`
- `reeftools-token-encryption-key`

Dem Cloud-Run-Service-Account Zugriff auf diese drei Secrets mit
**Secret Manager Secret Accessor** geben.

## 4. Repository mit Cloud Run verbinden

Im Cloud-Run-Assistenten:

- Webdienst bereitstellen
- Repository verbinden
- `xsiimonox/osci-chem-inventory`
- Branch `main`
- Buildpacks von Google Cloud
- Runtime `Node.js`
- Quellverzeichnis `/`
- Region `europe-west1`
- Mindestinstanzen `0`
- Authentifizierung: nicht durch Cloud-Run-IAM schützen, da ReefTools den
  eigenen Google-Login verwendet

## 5. Umgebungsvariablen und Secrets

Umgebungsvariablen:

```text
GOOGLE_OAUTH_CLIENT_ID=<OAuth-Client-ID>
GOOGLE_OAUTH_REDIRECT_URI=https://reeftools.de/auth/google/callback
NODE_ENV=production
```

Als Secret-Umgebungsvariablen:

```text
GOOGLE_OAUTH_CLIENT_SECRET=google-oauth-client-secret:latest
SESSION_SECRET=reeftools-session-secret:latest
TOKEN_ENCRYPTION_KEY=reeftools-token-encryption-key:latest
```

## 6. Vor dem produktiven Start

1. `https://reeftools.de/healthz` muss `{"ok":true}` liefern.
2. `/api/session` muss zunächst `authenticated: false` liefern.
3. `/auth/google` muss zur Google-Anmeldung weiterleiten.
4. Nach der Anmeldung muss `/api/session` die E-Mail anzeigen.
5. Erst danach den Google-Drive-Sync im Frontend testen.

Die bestehende Frontend-Synchronisierung muss noch auf die Backend-Routen
umgestellt werden. Bis dahin bleibt der bisherige direkte Browser-Login aktiv.
