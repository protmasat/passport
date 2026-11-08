const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    Fullname: {
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
      default: Math.random() * 1000,
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

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;

// VALIDATE EMAIL:
