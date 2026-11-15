const Message = require("../models/Message");
const SendMail = require("../utils/SendMail");

const mongoose = require("mongoose");

// create message
const SendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ sucess: false, message: "Name is required" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ sucess: false, message: "Email is required" });
    }
    if (!message) {
      return res
        .status(400)
        .json({ sucess: false, message: "Message is required" });
    }

    const newMessage = await Message.create({
      name,
      email,
      message,
      status: "pending",
    });

    // fire and forget: the user's request no longer depends on email delivery
    SendMail(email, name, message).catch((err) =>
      console.error("Email failed:", err.message),
    );

    res
      .status(201)
      .json({ sucess: true, message: "Message sent", data: newMessage });
  } catch (error) {
    console.error(error.message);

    if (error.code === 11000) {
      return res.status(409).json({
        sucess: false,
        message: "A message with this email already exists",
      });
    }

    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

// read messages
const GetMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAT: -1 });

    if (messages.length === 0) {
      return res.status(404).json({ message: "No message found" });
    }

    res.status(200).json({
      sucess: true,
      message: "Messages retrieved",
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Internal server error",
      data: messages,
    });
  }
};

// read message
const GetMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid message id" });
    }

    const message = await Message.findById(id);

    if (!message) {
      return res
        .status(404)
        .json({ sucess: false, message: "No message found" });
    }

    res.status(200).json({
      sucess: true,
      message: "Message retrieved",
      data: message,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

module.exports = GetMessage;

const UpdateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      return res.status(400).json({ message: "message not found" });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid message id" });
    }

    const VALID_STATUSES = ["pending", "resolved", "inprogress"];

    if (!VALID_STATUSES.includes(status)) {
      return res.status(404).json({ sucess: false, message: "Invalid status" });
    }

    const updatedBody = await Message.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedBody) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      sucess: true,
      message: "Messages updated",
      data: updatedBody,
    });
  } catch (error) {
    res
      .status(500)
      .json({ sucess: false, message: "Internal server error", data: {} });
  }
};

// update message

module.exports = {
  SendMessage,
  GetMessage,
  GetMessages,
  UpdateMessageStatus,
};
