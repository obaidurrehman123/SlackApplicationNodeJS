const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/dbConnection");
const cors = require("cors");
const connectMongo = require("./config/database");
const { logger } = require("./services/winston");
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB();
connectMongo();

const morganStream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

app.use(morgan("combined", { stream: morganStream }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

module.exports = app;
