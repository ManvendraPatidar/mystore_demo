const signup_middleware = (req, res, next) => {
  const { phone, password, role = "customer" } = req.body;

  if (!phone || !password)
    return res.status(400).json({
      message: "bad request",
      error: "phone ,password and role moust not be empty ",
    });

  if (!(role === "customer" || role === "seller"))
    return res.status(400).json({
      message: "bad request",
      error: "invalid value for rolee (must be 'customer' or 'seller')",
    });

  next();
};

module.exports = {
  signup_middleware,
};
