const express = require("express");
const { LoginAdmin, RegisterAdmin } = require("../controller/adminController");
const requireAuth = require("../middleware/Auth");
const requireRole = require("../middleware/RequireRole");
const adminRoutes = express.Router();
// login
adminRoutes.post("/login", LoginAdmin);

// register
adminRoutes.post(
  "/register",
  requireAuth,
  requireRole(["admin"]),
  RegisterAdmin,
);

module.exports = adminRoutes;
