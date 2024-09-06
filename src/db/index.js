const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
        );
        console.log(
            `MONGO DB CONNECTED! DB HOST : ${connectionInstance.connection.host}`
        );
    } catch (err) {
        console.error(`Error : ${err}`);
    }
};

module.exports = connectDB;
