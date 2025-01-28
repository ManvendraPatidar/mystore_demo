const { Authentication } = require("./models/Authentication.js");
const { Customer } = require("./models/Customer.js");

const associations = () => {
  Authentication.hasOne(Customer);
  Customer.belongsTo(Authentication, { foreignKey: "authId" });
};

module.exports = {
  associations,
};
