const { createLogger, format, transports } = require('winston');
require('winston-mongodb');
const { combine, timestamp, json, colorize } = format;

const consoleLogFormat = format.combine(
    format.colorize(),
    format.printf(({ level, message, timestamp }) => {
        return `${level}:  ${message}`;
    })
);

// Create a Winston logger
const logger = createLogger({
    level: 'info',
    format: combine(timestamp(), json()),
    transports: [
        new transports.Console({
            format: consoleLogFormat,
        }),
        // new transports.File({ filename: 'app.log' }),
        new transports.MongoDB({
            db: `${process.env.MONGODB_URI}/AnomX`,
            collection: 'log_messages',
            level: 'info',
            options: { useUnifiedTopology: true },
            format: combine(timestamp(), json()),
        }),
    ],
});

module.exports = logger;
