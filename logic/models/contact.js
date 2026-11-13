const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter name"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  message: {
    type: String,
    required: [true, "Enter name"],
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "resolved", "inprogress"],
  },
});

const MessageModel = mongoose.model("Message", contactSchema);
module.exports = MessageModel;

// name
// email
// message
