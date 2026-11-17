require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserModel = require("../models/user");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected");

    const existing = await UserModel.findOne({ email: process.env.EMAIL });
    if (existing) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.PASSWORD, 10);

    await UserModel.create({
      email: process.env.EMAIL,
      password: hashedPassword,
      role: "admin",
      fullname: process.env.FULLNAME,
    });

    console.log("Admin created");
  } catch (error) {
    console.error("Failed to create admin:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
