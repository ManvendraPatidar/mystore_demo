const express = require("express");
const {
  signup_middleware,
} = require("../middlewares/AuthenticationMiddleware");
const {
  signup_controller,
  login_controller,
} = require("../controllers/AuthenticationController");

const AuthenticationRouter = express.Router();

AuthenticationRouter.get("/", (req, res) => {
  return res.json("Hello User Authentication here");
});

AuthenticationRouter.post("/signup", signup_middleware, signup_controller);

AuthenticationRouter.post("/login", signup_middleware, login_controller);
module.exports = { AuthenticationRouter };
