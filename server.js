const crypto = require('node:crypto');
const path = require('node:path');

const express = require('express');
const cookieSession = require('cookie-session');
const { Firestore } = require('@google-cloud/firestore');
const { google } = require('googleapis');

const app = express();
const port = Number(process.env.PORT || 8080);
const isProduction = process.env.NODE_ENV === 'production';
const rootDir = __dirname;
const oauthScopes = ['https://www.googleapis.com/auth/drive.appdata'];

function requiredEnv(name) {
    const value = process.env[name]?.trim();
    if (!value) throw new Error(`Missing required environment variable: ${name}`);
    return value;
}

function getOAuthClient() {
    return new google.auth.OAuth2(
        requiredEnv('GOOGLE_OAUTH_CLIENT_ID'),
        requiredEnv('GOOGLE_OAUTH_CLIENT_SECRET'),
        requiredEnv('GOOGLE_OAUTH_REDIRECT_URI')
    );
}

function getFirestore() {
    return new Firestore({ projectId: process.env.GOOGLE_CLOUD_PROJECT });
}

function tokenCollection() {
    return getFirestore().collection('oauth_tokens');
}

function tokenDocumentId(email) {
    return crypto.createHash('sha256').update(email.toLowerCase()).digest('hex');
}

function encryptionKey() {
    const raw = Buffer.from(requiredEnv('TOKEN_ENCRYPTION_KEY'), 'base64');
    if (raw.length !== 32) throw new Error('TOKEN_ENCRYPTION_KEY must decode to exactly 32 bytes.');
    return raw;
}

function encrypt(value) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey(), iv);
    const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
    return [iv, cipher.getAuthTag(), encrypted].map(part => part.toString('base64')).join('.');
}

function decrypt(value) {
    const [ivValue, tagValue, encryptedValue] = String(value).split('.');
    const decipher = crypto.createDecipheriv(
        'aes-256-gcm',
        encryptionKey(),
        Buffer.from(ivValue, 'base64')
    );
    decipher.setAuthTag(Buffer.from(tagValue, 'base64'));
    return Buffer.concat([
        decipher.update(Buffer.from(encryptedValue, 'base64')),
        decipher.final()
    ]).toString('utf8');
}

async function saveRefreshToken(email, refreshToken) {
    await tokenCollection().doc(tokenDocumentId(email)).set({
        email,
        refreshToken: encrypt(refreshToken),
        updatedAt: new Date().toISOString()
    }, { merge: true });
}

async function loadRefreshToken(email) {
    const snapshot = await tokenCollection().doc(tokenDocumentId(email)).get();
    if (!snapshot.exists) return '';
    return decrypt(snapshot.data()?.refreshToken || '');
}

async function deleteRefreshToken(email) {
    await tokenCollection().doc(tokenDocumentId(email)).delete();
}

function requireSession(req, res, next) {
    if (!req.session?.email) return res.status(401).json({ authenticated: false });
    next();
}

function safeRedirectUri() {
    return requiredEnv('GOOGLE_OAUTH_REDIRECT_URI');
}

app.set('trust proxy', 1);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieSession({
    name: 'reeftools_session',
    keys: [requiredEnv('SESSION_SECRET')],
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction,
    maxAge: 1000 * 60 * 60 * 24 * 30
}));

app.get('/healthz', (req, res) => res.json({ ok: true }));

app.get('/api/session', (req, res) => {
    res.json({
        authenticated: Boolean(req.session?.email),
        email: req.session?.email || ''
    });
});

app.get('/auth/google', (req, res) => {
    const state = crypto.randomBytes(24).toString('hex');
    req.session.oauthState = state;
    const client = getOAuthClient();
    const url = client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        include_granted_scopes: true,
        state,
        scope: oauthScopes
    });
    res.redirect(url);
});

app.get('/auth/google/callback', async (req, res, next) => {
    try {
        if (!req.query.code || !req.query.state || req.query.state !== req.session?.oauthState) {
            return res.status(400).send('Ungültige OAuth-Sitzung. Bitte erneut anmelden.');
        }
        delete req.session.oauthState;
        const client = getOAuthClient();
        const { tokens } = await client.getToken(req.query.code);
        if (!tokens.refresh_token) {
            return res.status(400).send('Google hat kein Refresh-Token geliefert. Bitte Zugriff widerrufen und erneut verbinden.');
        }
        client.setCredentials(tokens);
        const oauth2 = google.oauth2({ version: 'v2', auth: client });
        const profile = await oauth2.userinfo.get();
        const email = profile.data.email || '';
        if (!email) return res.status(400).send('Google-Konto konnte nicht ermittelt werden.');
        await saveRefreshToken(email, tokens.refresh_token);
        req.session.email = email;
        res.redirect('/#cloud-connected');
    } catch (error) {
        next(error);
    }
});

app.post('/auth/logout', async (req, res, next) => {
    try {
        if (req.session?.email) await deleteRefreshToken(req.session.email);
        req.session = null;
        res.json({ authenticated: false });
    } catch (error) {
        next(error);
    }
});

app.post('/api/drive/request', requireSession, async (req, res, next) => {
    try {
        const requestPath = String(req.body?.path || '');
        const method = String(req.body?.method || 'GET').toUpperCase();
        const allowedPath = /^\/(upload\/)?drive\/v3\//.test(requestPath);
        if (!allowedPath || !['GET', 'POST', 'PATCH', 'DELETE'].includes(method)) {
            return res.status(400).json({ error: 'Nicht erlaubter Google-Drive-Endpunkt.' });
        }
        const refreshToken = await loadRefreshToken(req.session.email);
        if (!refreshToken) return res.status(401).json({ error: 'Google-Sitzung ist nicht verbunden.' });
        const client = getOAuthClient();
        client.setCredentials({ refresh_token: refreshToken });
        const accessToken = await client.getAccessToken();
        const response = await fetch(`https://www.googleapis.com${requestPath}`, {
            method,
            headers: {
                Authorization: `Bearer ${accessToken.token}`,
                ...(req.body?.headers || {})
            },
            body: method === 'GET' || method === 'DELETE' ? undefined : req.body?.body
        });
        const body = await response.text();
        res.status(response.status);
        res.set('Content-Type', response.headers.get('content-type') || 'application/json');
        res.send(body);
    } catch (error) {
        next(error);
    }
});

app.use(express.static(rootDir, { index: 'index.html' }));
app.use((req, res) => res.sendFile(path.join(rootDir, 'index.html')));

app.use((error, req, res, next) => {
    console.error(error);
    if (res.headersSent) return next(error);
    res.status(500).json({ error: 'Interner Serverfehler.' });
});

app.listen(port, () => {
    console.log(`ReefTools Cloud Run server listening on port ${port}`);
});
