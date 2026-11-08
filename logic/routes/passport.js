const express = require("express");
const {
  CreatePassport,
  GetPassports,
  GetPassport,
} = require("../controller/passport");
const RequireBody = require("../middleware/requireBody");
const ValidatePassport = require("../middleware/ValidatePassport");
const passportRoutes = express.Router();

// create passport
passportRoutes.post("/", RequireBody, ValidatePassport, CreatePassport);

// read passports
passportRoutes.get("/", GetPassports);

// update passport
passportRoutes.get("/:id", GetPassport);

// delete passport

module.exports = passportRoutes;
