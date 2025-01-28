const { DataTypes, Model } = require("sequelize");
const sequalize = require("../db");
const Customer = require("./Customer");

const BankAccount = sequalize.define("Account", {
  accountNumber: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
  },

  bankName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  IFSCCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  BankAccount,
};
