const express = require("express");
const { LoginAdmin, RegisterAdmin } = require("../controller/AdminController");
const adminRoutes = express.Router();
// login
adminRoutes.post("/login", LoginAdmin);

// register
adminRoutes.post("/register", RegisterAdmin);

module.exports = adminRoutes;
