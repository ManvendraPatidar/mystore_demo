const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Address = sequelize.define("Address", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
