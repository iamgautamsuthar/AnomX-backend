const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
);

app.use(express.json());
app.use(express.urlencoded());

module.exports = app;
