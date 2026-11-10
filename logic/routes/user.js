const express = require("express");
const { Register } = require("../controller/user");
const RequireBody = require("../middleware/requireBody");
const userRouter = express.Router();

// login

// register
// email, password, fullname

// logout
userRouter.post("/signup", RequireBody, Register);

module.exports = userRouter;
