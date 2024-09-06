require('dotenv').config();

const connectDB = require('./db/index.js');
const app = require('./app.js');

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(
                `Server is running at port : ${process.env.PORT || 3000}`
            );
        });
    })
    .catch((err) => {
        console.log('MongoDb error');
    });
