// import Customer from;
const Customer = require("../models/Customer");

const add_customer_controller = async (req, res) => {
  const { name, age, email, phone } = req.body;

  try {
    const customer = await Customer.create({
      name: name,
      age: age,
      email: email || null,
      phone: phone,
    });

    console.log("customer : --->", customer);
    res.status(201).json({
      message: "customer created successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      error: error?.errors[0]?.message,
    });
  }
};

const getAllCustomerController = async (req, res) => {
  console.log("customers all customer");
  try {
    const customers = await Customer.findAll();

    console.log(customers);

    res.status(200).json({
      message: "fetch all customers",
      customer_list: customers,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to fetch customer list",
      error: error,
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

    // After updating, fetch the updated customer from the database
    // const updatedCustomer = await customer.reload(); // Reload the updated data

    // // Log the updated customer instance
    // console.log("---customer after update", updatedCustomer);

    // Send response with the updated user data
    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user", error });
  }
};
module.exports = {
  add_customer_controller,
  getAllCustomerController,
  getCustomerById,
  updateCustomerController,
  deleteCustomerController,
};
