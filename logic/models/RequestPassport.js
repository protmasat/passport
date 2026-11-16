const mongoose = require("mongoose");
const requestSchema = new mongoose.Schema({
  // name
  name: {
    type: String,
    required: ["true", "Name is required"]
  },
  surname: {
    type: String,
    required: [true, "Surname is required"]
  },
  placeOfBirth: {
    type: String,
    required: [true, "nationality is required"]
  },
  sex: {
    type: String,
    enum: ["male", "female"],
  }
}, {
  timestamps: true
})

const Request = mongoose.model("Request", requestSchema)
module.exports = Request
