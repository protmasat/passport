const express = require("express");
const { Register, Login } = require("../controller/user");
const RequireBody = require("../middleware/requireBody");
const userRouter = express.Router();

// logout
userRouter.post("/signup", RequireBody, Register);

userRouter.post("/login", RequireBody, Login);

module.exports = userRouter;
