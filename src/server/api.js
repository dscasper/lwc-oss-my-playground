// Simple Express server setup to serve for local testing/dev API server
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const axios = require('axios');

require('dotenv').config();

const app = express();
app.use(helmet());
app.use(compression());

const HOST = 'localhost';
const PORT = 3002;

const { RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY } = process.env;
if (!(RECAPTCHA_SITE_KEY && RECAPTCHA_SECRET_KEY)) {
    console.error(
        'Cannot start app: missing mandatory configuration. Check your .env file RECAPTCHA_SITE_KEY.'
    );
    process.exit(-1);
}

app.post('/api/recaptchaVerify',  (req, res) => {
    const secret_key = RECAPTCHA_SECRET_KEY;
    const token = req.body.token;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
    axios.post(url)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
                next(error);
            }
        );
});

app.get('/api/v1/endpoint', (req, res) => {
    res.json({ success: true });
});

app.listen(PORT, () =>
    console.log(
        `✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`
    )
);
