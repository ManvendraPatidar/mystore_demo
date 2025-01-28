const express = require("express");
const {
  add_customer_middleware,
  deleteCustomerMiddleware,
} = require("../middlewares/CustomerMiddleware");

const {
  add_customer_controller,
  getAllCustomerController,
  getCustomerById,
  deleteCustomerController,
  updateCustomerController,
  addBankAccountController,
} = require("../controllers/CustomerController");

const { jwtCheckMiddleware } = require("../middlewares/JwtCheckMiddleware");
const { addAccountController } = require("../controllers/AccountController");

const customerRouter = express.Router();

customerRouter.get("/getAllCustomers", getAllCustomerController);

customerRouter.post(
  "/createCustomer",
  jwtCheckMiddleware,
  add_customer_middleware,
  add_customer_controller
);

customerRouter.put(
  "/updateCustomer/:id",
  deleteCustomerMiddleware,
  add_customer_middleware,
  updateCustomerController
);

customerRouter.delete(
  "/:id",
  deleteCustomerMiddleware,
  deleteCustomerController
);

customerRouter.post(
  "/addBankAccount",
  jwtCheckMiddleware,
  addAccountController
);

customerRouter.post("/addBankAccount", addBankAccountController);

customerRouter.get("/:id", getCustomerById);

module.exports = customerRouter;
