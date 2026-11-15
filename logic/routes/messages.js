const express = require("express");
const RequireBody = require("../middleware/requireBody");
const {
  SendMessage,
  GetMessages,
  GetMessage,
  UpdateMessageStatus,
} = require("../controller/message");
const messagesRouter = express.Router();

messagesRouter.post("/", RequireBody, SendMessage);

messagesRouter.get("/", GetMessages);

messagesRouter.get("/:id", GetMessage);

messagesRouter.put("/:id", UpdateMessageStatus);

module.exports = messagesRouter;
