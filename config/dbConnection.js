const { sequelize } = require("../models");
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log(`PGsql connected Successfully`.green.underline.bold);
    } catch (error) {
        console.log("Database connection failed. exiting now ...".red.bold);
        console.error(error);
        process.exit(1);
    }
}
module.exports = connectDB;