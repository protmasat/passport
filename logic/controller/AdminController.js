// register: made by admin
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const RegisterAdmin = async (req, res) => {
  try {
    const { email, password, fullname } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    if (!fullname) {
      return res.status(400).json({
        success: false,
        message: "Fullname is required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const existingUser = await UserModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists. Try using a different email",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      email: email.toLowerCase().trim(),
      password: encryptedPassword,
      fullname: fullname.trim(),
      role: "admin",
    });

    const payload = { userId: newUser._id, role: newUser.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        payload,
        token,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const LoginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const user = await UserModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        token,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  RegisterAdmin,
  LoginAdmin,
};
