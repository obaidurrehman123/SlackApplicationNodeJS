const winston = require("winston");
const winstonMongoDB = require("winston-mongodb");
const { createStream } = require("morgan");
const connectMongo = require("../config/database");
const Logs = require("../mongo/logs");

// establish mongo connection
const dbConnection = connectMongo();
// MongoDB transport configuration
const mongoDBTransport = new winston.transports.MongoDB({
  db: process.env.MONGO_URI, // MongoDB connection string
  options: { useUnifiedTopology: true }, // MongoDB connection options
  dbConnection,
  formatLog: (info) => {
    const log = new Logs({
      message: info.message,
      level: info.level,
      timestamp: info.timestamp,
    });

    // Save the log to the database
    log.save();

    return info;
  },
});

// Create a logger instance
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console(), mongoDBTransport],
});

module.exports = { logger };
