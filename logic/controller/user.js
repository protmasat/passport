const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");

const Register = async (req, res) => {
  try {
    const { email, password, fullname } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }

    if (!fullname) {
      return res.status(400).json({ message: "Fullname required" });
    }

    const VALID_ROLES = ["admin", "user"];

    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({ message: "Valid role is required." });
    }

    const encyptedPassword = await bcrypt.hash(password, 10);

    const isValidEmail = await UserModel.findOne({ email });

    if (isValidEmail) {
      return res.status(400).json({ message: "Try using a diffferent email" });
    }

    const newUser = await UserModel.create({
      email,
      password,
      fullname,
      role: "user",
    });

    console.log(newUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      sucess: false,
      message: "Internal server error",
      error: "Internal server error",
    });
  }
};

module.exports = {
  Register,
};
