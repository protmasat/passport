const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { email, password, fullname, role } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }

    if (!fullname) {
      return res.status(400).json({ message: "Fullname required" });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Try a different email!" });
    }

    const validRoles = ["admin", "user"];
    const userRole = role || "user";

    if (!validRoles.includes(userRole)) {
      return res.status(400).json({ message: "Invalid role!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      fullname,
      role: userRole,
    });

    const payload = { userId: newUser._id, role: newUser.role };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "Account registered",
      token,
      data: userResponse,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        sucess: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        sucess: false,
        message: "Email is required",
      });
    }

    const exists = await UserModel.findOne({ email });

    if (!exists) {
      return res
        .status(200)
        .json({ sucess: false, message: "Try a different email" });
    }

    const passwordMatch = await bcrypt.compare(password, exists.password);

    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Password or email is incorrect",
      });
    }

    const payload = { userId: exists._id, role: exists.role };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      sucess: true,
      message: "Logged sucessfully",
      data: {
        token,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  Register,
  Login,
};
