const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "user": "root",
    "password": process.env.DB_PASSWORD,
    "database": "youngbin",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "user": "root",
    "password": process.env.DB_PASSWORD,
    "database": "youngbin",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "user": "root",
    "password": process.env.DB_PASSWORD,
    "database": "youngbin",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}