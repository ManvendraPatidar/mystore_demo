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
} = require("../controllers/CustomerController");

const customerRouter = express.Router();

customerRouter.get("/getAllCustomers", getAllCustomerController);

customerRouter.post(
  "/createCustomer",
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

customerRouter.get("/:id", getCustomerById);

module.exports = customerRouter;
