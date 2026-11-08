const express = require("express");
const adminRouter = express.Router();

// create
adminRouter.post("/", (req, res) => {
  res.status(201).json({ message: "Added passport" });
});

// read
adminRouter.get("/", (req, res) => {
  res.status(200).json({ message: "get passport" });
});

// update
adminRouter.put("/", (req, res) => {
  res.status(200).json({ message: "update passport" });
});

// delete
adminRouter.put("/", (req, res) => {
  res.status(200).json({ message: "delete passport" });
});
