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
const requireAuth = require("../middleware/Auth");
const requireRole = require("../middleware/RequireRole");

const ValidatePassport = require("../middleware/ValidatePassport");

// create passport
passportRoutes.post(
  "/",
  requireAuth,
  RequireBody,
  ValidatePassport,
  CreatePassport,
);

passportRoutes.use(requireAuth);

// read passports
passportRoutes.get("/", requireRole(["admin"]), GetPassports);

// get passport by idGetPassport
passportRoutes.get("/:id", requireRole(["admin"]), GetPassport);

// update passport
passportRoutes.put("/:id", requireRole(["admin"]), UpdatePassport);

// delete passport
passportRoutes.delete("/:id", requireRole(["admin"]), DeletePassport);

module.exports = passportRoutes;
