const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    verificationCode: {
      type: Number,
      default: () => Math.floor(Math.random() * 1000000),
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;

// VALIDATE EMAIL:
