const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.routes.js');
const postRouter = require('./routes/post.routes.js');
const authRouter = require('./routes/auth.routes.js');

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1', authRouter);

// app.get('/', (req, res) => {
//     res.send('Hello');
// });

module.exports = app;
