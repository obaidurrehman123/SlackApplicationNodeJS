
require('dotenv').config();
const config = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "port": parseInt(process.env.DB_PORT),
    "ssl": process.env.DB_SSL === 'true',
    "dialectOptions": {
      "ssl": {
        "require": process.env.DB_SSL_REQUIRE === 'true',
        "rejectUnauthorized": process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
      }
    }
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "port": parseInt(process.env.DB_PORT),
    "ssl": process.env.DB_SSL === 'true',
    "dialectOptions": {
      "ssl": {
        "require": process.env.DB_SSL_REQUIRE === 'true',
        "rejectUnauthorized": process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
      }
    }
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "port": parseInt(process.env.DB_PORT),
    "ssl": process.env.DB_SSL === 'true',
    "dialectOptions": {
      "ssl": {
        "require": process.env.DB_SSL_REQUIRE === 'true',
        "rejectUnauthorized": process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
      }
    }
  }
}
module.exports = config;