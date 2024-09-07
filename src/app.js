const express = require('express');
const cors = require('cors');
// const logger = require('./logger.js');
// const morgan = require('morgan');

// * Import Routes
const userRouter = require('./routes/user.routes.js');
const postRouter = require('./routes/post.routes.js');
const authRouter = require('./routes/auth.routes.js');

//
const app = express();

// * Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const morganFormat = ':method :url :status :response-time ms';

// app.use(
//     morgan(morganFormat, {
//         stream: {
//             write: (message) => {
//                 const logObject = {
//                     method: message.split(' ')[0],
//                     url: message.split(' ')[1],
//                     status: message.split(' ')[2],
//                     responseTime: message.split(' ')[3],
//                 };
//                 logger.info(JSON.stringify(logObject));
//             },
//         },
//     })
// );

// * Routing
app.get('/', (req, res) => {
    res.send('Everything is okay | Anomx');
});
app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1', authRouter);

module.exports = app;
