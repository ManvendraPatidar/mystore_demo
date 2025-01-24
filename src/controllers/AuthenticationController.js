const { Authentication } = require("../models/Authentication");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const signup_controller = async (req, res) => {
  const { phone, password, role = "customer" } = req.body;

  try {
    const credentials = await Authentication.findAll();

    console.log("Credentials Array:", credentials);
    const filteredUsers = credentials.filter(
      (item) => item.dataValues.phone.toString() === phone.toString()
    );

    console.log("Filtered Users:", filteredUsers);
    if (filteredUsers.length > 0) {
      // already exist
      return res.status(200).json({ message: "User already exist" });
    }

    const createAuth = await Authentication.create({
      phone,
      password,
      role,
    });

    // console.log("customer : --->", createAuth);

    res.status(201).json({
      message: "Account created with this number",
      createAuth,
    });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong",
      error,
    });
  }
};

const login_controller = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const phoneAsBigInt = BigInt(phone);

    const user = await Authentication.findOne({
      where: { phone: phoneAsBigInt },
    });
    if (!user) {
      return res.status(200).json({ message: "Account not exist" });
    }

    if (password != user.password) {
      return res.status(200).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ phone }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "Login successfully", token, customer: user });
  } catch (error) {
    res.status(400).json({ message: "something went wrong ", error });
  }
};

module.exports = {
  signup_controller,
  login_controller,
};
