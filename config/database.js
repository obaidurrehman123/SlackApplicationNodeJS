const mongoose = require("mongoose");


const connectMongo = async () => {
    try {
        let connectionString;
        if (process.env.MONGO_URI) {
            connectionString = process.env.MONGO_URI;
        }
        else {
            connectionString = "mongodb://hamza:1234@mongo-container:27017/test";
        }
        const conn = await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(
            `MongoDB Connected : ${conn.connection.host}`.cyan.underline.bold
        );
        return conn; // Return the Mongoose connection object
    } catch (error) {
        console.log("Database Connection failed. exitting now ...".red.bold);
        console.error(error);
        process.exit(1);
    }
};
module.exports = connectMongo;