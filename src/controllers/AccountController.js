const { BankAccount } = require("../models/BankAccount");
const { Customer } = require("../models/Customer");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const addAccountController = async (req, res) => {
  const { accountNumber, bankName, IFSCCode } = req.body;

  console.log("---", accountNumber, "---", bankName, "---", IFSCCode);
  if (!(accountNumber && bankName && IFSCCode)) {
    res.status(400).json({
      message: "Account Number , Bank Name and IFSC Code must not be empty ",
    });
  }

  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const account = await BankAccount.create({
      accountNumber,
      bankName,
      IFSCCode,
    });

    // // Update AccountId where authId is 5
    const [updatedRowCount] = await Customer.update(
      { accountId: account.id }, // The new value to set for AccountId
      { where: { authId: decoded.id } } // Condition to match the rows
    );

    if (updatedRowCount > 0) {
      console.log(`Successfully updated ${updatedRowCount} customer(s).`);
      const customer = await Customer.findOne({
        where: { accountId: account.id },
      });

      console.log("customer after update ---- >", customer);

      res
        .status(200)
        .json({ message: "Account added successfully !!", account, customer });
    } else {
      console.log("No customers found with this token");
    }

    // add this account id in the Customer Table corresponding to its auth id
    // and then try to return the whole customer object.

    // and then when we fetch all customer then i also got the account details as well.
  } catch (error) {
    res.status(500).json({
      message: "Account not created",
      error: error,
    });
  }
};

module.exports = {
  addAccountController,
};
