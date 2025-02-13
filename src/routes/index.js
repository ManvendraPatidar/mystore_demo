const express = require("express");

const customerRouter = require("./CustomerRoutes");
const { AuthenticationRouter } = require("./AuthenticationRoutes");

const routers = express.Router();

routers.use("/customer", customerRouter);
routers.use("/auth", AuthenticationRouter);

module.exports = routers;
