const express = require("express");
const passportRoutes = express.Router();

const {
  CreatePassport,
  GetPassports,
  GetPassport,
  UpdatePassport,
  DeletePassport,
} = require("../controller/passport");

const RequireBody = require("../middleware/requireBody");
const ValidateId = require("../middleware/ValidateId");
const requireAuth = require("../middleware/Auth");

const ValidatePassport = require("../middleware/ValidatePassport");

// create passport
passportRoutes.post(
  "/",
  requireAuth,
  RequireBody,
  ValidatePassport,
  CreatePassport,
);

// read passports
passportRoutes.get("/", GetPassports);

// get passport by idGetPassport
passportRoutes.get("/:id", GetPassport);

// update passport
passportRoutes.put("/:id", UpdatePassport);

// delete passport
passportRoutes.delete("/:id", DeletePassport);

module.exports = passportRoutes;
