const { sequelize, Sequelize } = require("sequelize");
require("dotenv").config();
const db = new Sequelize({
  database: "memotest",
  username: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

module.exports = db;
