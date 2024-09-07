require('dotenv').config();

const connectDB = require('./db/index.js');
const app = require('./app.js');

// * Database Connection
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(
                `Server is running at port : ${process.env.PORT || 3000}`
            );
        });
    })
    .catch((error) => {
        console.log('Database Connection Error');
        console.log(error);
    });
