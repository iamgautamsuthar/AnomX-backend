const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.routes.js');

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', userRouter);

// app.get('/', (req, res) => {
//     res.send('Hello');
// });

module.exports = app;
