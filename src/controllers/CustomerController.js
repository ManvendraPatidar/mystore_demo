const sequelize = require("../db");
const { Authentication } = require("../models/Authentication");
const { BankAccount } = require("../models/BankAccount");
const { Customer } = require("../models/Customer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const add_customer_controller = async (req, res) => {
  const { name, age, email, authId } = req.body;

  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    console.log("Token", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token: authId ", decoded);

    const customer = await Customer.create({
      name: name,
      age: age,
      email: email || null,
      authId: decoded?.id,
    });

    res.status(201).json({
      message: "customer created successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

const getAllCustomerController = async (req, res) => {
  console.log("--", 1);

  try {
    const customers = await Customer.findAll({
      include: {
        model: Authentication,
      },
    });
    console.log("--");

    res.status(200).json({
      message: "fetch all customers",
      total_customer: customers.length,
      customer_list: customers,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to fetch customer list__",
      error,
    });
  }
};

const getCustomerById = async (req, res) => {
  console.log("By id chal rha ");
  const id = req.params.id;

  try {
    const customers = await Customer.findAll();
    const filteredUsers = customers.filter((customer) => customer.id === id);

    console.log("this is what i found ", filteredUsers);
    if (filteredUsers.length) {
      res.status(200).json({
        message: "User Found",
        customer: filteredUsers,
      });
    } else {
      res.status(404).json({
        message: "User Not Found",
        customer: filteredUsers,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.errors[0].message,
    });
  }
};

const deleteCustomerController = async (req, res) => {
  const id = req.params.id;
  try {
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: "User not found" });
    }

    // Destroy (delete) the user
    await customer.destroy();

    // Send success response
    res.status(200).json({ message: `User with ID ${id} deleted` });
  } catch (error) {
    res.status(500).json({ message: `User with ID ${id} deleted` });
  }
};

const updateCustomerController = async (req, res) => {
  const { id } = req.params;
  const { name, age, email, phone } = req.body;

  try {
    // Find the user by ID
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("---customer", customer);
    // Update the user's fields
    const updatedCustomer = await customer.update({
      name,
      age,
      email,
      phone,
    });

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user", error });
  }
};

const addBankAccountController = async (req, res) => {
  const { userId, accountNumber, bankName, IFCCode } = req.body;

  console.log(req.body);
  if (userId && accountNumber && bankName && IFCCode) {
    try {
      const account = await BankAccount.create({
        userId: userId,
        accountNumber: accountNumber,
        bankName,
        IFCCode,
      });

      return res.status(201).json({
        message: "Acccount Added successfully",
        account,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  }

  res.status(500).json({
    error: error,
  });
};
module.exports = {
  add_customer_controller,
  getAllCustomerController,
  getCustomerById,
  updateCustomerController,
  deleteCustomerController,
  addBankAccountController,
};
