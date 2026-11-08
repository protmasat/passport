const express = require("express");
const dotenv = require("dotenv").config();
const passportRoutes = require("./routes/passport");
const ConnectDB = require("./config/DB");
const app = express();

app.disable("x-powered-by");

const PORT = process.env.PORT || 3400;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Passport is running smooth" });
});

app.use("/api/v1/healthy", (req, res) => {
  res.status(200).json({
    message: "System is healthy",
  });
});

app.use("/api/v1/passports", passportRoutes);

app.use("/", (req, res) => {
  res.status(404).json({ message: "Invalid path" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal server error!",
  });
});

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
  ConnectDB();
});

// admin to CRUD Passport info
// Third Party to get passport info based on user

// add rate limit
