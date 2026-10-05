# ReefTools Cloud Run

This project now contains the Node.js Cloud Run foundation for a server-side
Google OAuth session and Google Drive appDataFolder access.

## Required environment variables

Set these as Cloud Run secrets or environment variables. Never commit the
values to GitHub.

```text
GOOGLE_OAUTH_CLIENT_ID
GOOGLE_OAUTH_CLIENT_SECRET
GOOGLE_OAUTH_REDIRECT_URI=https://reeftools.de/auth/google/callback
SESSION_SECRET
TOKEN_ENCRYPTION_KEY
NODE_ENV=production
```

Generate the two local secrets with:

```bash
openssl rand -base64 32
```

`TOKEN_ENCRYPTION_KEY` must decode to exactly 32 bytes. The backend stores
only an encrypted Google refresh token in Firestore. The browser receives a
secure, HTTP-only session cookie instead.

## Local check

```bash
npm install
npm run check
```

## Cloud Run deployment

Use Google Cloud Buildpacks with Node.js, the repository root as source, and
the `main` branch. Cloud Run supplies the `PORT` environment variable.

The frontend still needs the final integration step: its existing direct
Google Drive calls must be routed through `/api/session`, `/auth/google`, and
`/api/drive/request` before this backend is used in production.
