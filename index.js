const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./src/db");
const routers = require("./src/routes");
const app = express();

// Load environment variables from .env file
dotenv.config();

// Test the Sequelize connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Sync all models with the database (creates tables if they don't exist)
sequelize
  .sync()
  .then(() => {
    console.log("Database tables are synchronized.");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

app.use("/api", routers);

// Basic route to check server status
app.get("/", (req, res) => {
  res.send("Hello, Express and Sequelize with PostgreSQL! All Set Ready to go");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
