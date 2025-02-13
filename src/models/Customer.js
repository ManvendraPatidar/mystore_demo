const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db");

const Customer = sequelize.define("Customer", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  authId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // Ensure the authId is unique for each customer
  },
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true, // Ensure the authId is unique for each customer
  },
});

module.exports = {
  Customer,
};
