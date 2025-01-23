// const { Pool } = require("pg");

const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create Sequelize instance to connect to PostgreSQL
const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  logging: false, // Set to true if you want to see SQL queries
});

module.exports = sequelize;
