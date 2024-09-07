const mongoose = require('mongoose');

// * Validation of Query
mongoose.set('strictQuery', true);

// * Database Connection
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
        );
        console.log('Database Connected');
    } catch (error) {
        console.log('Database Connection Failed');
        console.error(`Error : ${err}`);
    }
};

module.exports = connectDB;
