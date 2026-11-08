const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  },
);

const AdminModel = mongoose.model("Admin", adminSchema);
module.exports = AdminModel;

// VALIDATE EMAIL:
