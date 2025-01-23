const express = require("express");
const customerRouter = require("./CustomerRoutes");

const routers = express.Router();

routers.use("/customer", customerRouter);

module.exports = routers;
