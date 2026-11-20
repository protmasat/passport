const express = require("express");
const RequireBody = require("../middleware/requireBody");
const {
  SendMessage,
  GetMessages,
  GetMessage,
  UpdateMessageStatus,
} = require("../controller/message");
const requireAuth = require("../middleware/Auth");
const requireRole = require("../middleware/RequireRole");

const messagesRouter = express.Router();

messagesRouter.post("/", RequireBody, SendMessage);

messagesRouter.get("/", requireAuth, requireRole(["admin"]), GetMessages);

messagesRouter.get("/:id", requireAuth, requireRole(["admin"]), GetMessage);

messagesRouter.put(
  "/:id",
  requireAuth,
  requireRole(["admin"]),
  UpdateMessageStatus,
);

module.exports = messagesRouter;
