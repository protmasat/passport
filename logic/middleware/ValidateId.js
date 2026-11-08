const mongoose = require("mongoose");

const ValidateId = (req, res, next) => {
  const { id } = req.body;

  if (!id) {
    return res.status(404).json({
      message: "Enter valid!",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "Passport not found!",
    });
  }

  next();
};

module.exports = ValidateId;
