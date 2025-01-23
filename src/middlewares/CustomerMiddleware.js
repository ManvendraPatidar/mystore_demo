const Customer = require("../models/Customer");

const add_customer_middleware = (req, res, next) => {
  const { name, age, phone } = req.body;
  console.log(req.body);

  if (name && age && phone) {
    if (!name.trim() || age < 18) {
      return res.status(400).json({
        message: "operation failed",
        error: "invaild input (name , age , phone)",
      });
    } else {
      //go to controller:
      next();
    }
  } else {
    res.status(400).json({
      message: "operation failed",
      error: "invaild input (name , age , phone)",
    });
  }
};

const deleteCustomerMiddleware = (req, res, next) => {
  const id = req.params.id;

  try {
    if (!id.trim) {
      return res.status(404).json({
        message: "Invaild Customer Id",
      });
    }

    const count = Customer.count();

    if (count < 1) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error,
    });
  }
};

module.exports = {
  add_customer_middleware,
  deleteCustomerMiddleware,
};
