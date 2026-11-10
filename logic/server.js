const express = require("express");

const path = require("path");
const fs = require("fs");
const YAML = require("yaml");
const swaggerUi = require("swagger-ui-express");
const OpenApiValidator = require("express-openapi-validator");

const specPath = path.join(__dirname, "docs", "openapi.yaml");
const spec = YAML.parse(fs.readFileSync(specPath, "utf8"));

const dotenv = require("dotenv").config();
const passportRoutes = require("./routes/passport");
const ConnectDB = require("./config/DB");
const userRouter = require("./routes/user");
const app = express();

app.disable("x-powered-by");

const PORT = process.env.PORT || 3400;

app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));

app.use(
  OpenApiValidator.middleware({
    apiSpec: specPath,
    validateRequests: true,
    ignoreUndocumented: true,
  }),
);

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
app.use("/api/v1/auth", userRouter);

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
