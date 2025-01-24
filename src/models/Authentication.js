const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Authentication = sequelize.define("Authentication", {
  phone: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM,
    values: ["customer", "seller"],
    allowNull: false,
    defaultValue: "customer",
  },
});

module.exports = {
  Authentication,
};
