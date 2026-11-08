// CREATE

const PassportModel = require("../models/passport");

// create passport
const CreatePassport = async (req, res) => {
  try {
    const {
      passportType,
      stateCode,
      surname,
      name,
      nationality,
      placeOfBirth,
      sex,
      issueDate,
      expiryDate,
      dateOfBirth,
      issuingAuthority,
      electronicallPrintedSignature,
    } = req.body;

    const newPassport = PassportModel.create({
      passportType,
      stateCode,
      surname,
      name,
      nationality,
      placeOfBirth,
      sex,
      issueDate,
      expiryDate,
      placeOfBirth,
      issuingAuthority,
      electronicallPrintedSignature,
    });

    if (!newPassport) {
      return res
        .status(404)
        .json({ sucess: false, data: {}, message: "New passport not found!" });
    }

    res
      .status(201)
      .json({ sucess: true, message: "New passport added", data: newPassport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// READ
const GetPassports = async (req, res) => {
  try {
    const passports = await PassportModel.find().sort({ createdAt: -1 });

    if (passports.length === 0) {
      return res.status(200).json({
        message: "No passport found",
      });
    }

    res.status(200).json({ message: "Passports retrieved", data: passports });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetPassport = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ sucess: falase, message: "Enter a valid passport" });
    }

    const passport = await PassportModel.findById(id);

    if (!passport) {
      return res.status(200).json({
        message: "Passport not found",
      });
    }

    res.status(200).json({ message: "Passports retrieved", data: passport });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE
const UpdatePassport = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ sucess: falase, message: "Enter a valid passport" });
    }

    const passport = await PassportModel.findByIdAndUpdate(
      id,
      {
        new: true,
        runValidators: true,
      },
      req.body,
    );

    if (!passport) {
      return res.status(200).json({
        message: "Passport not found",
      });
    }

    res.status(200).json({ message: "Passports retrieved", data: passport });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE
const DeletePassport = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ sucess: falase, message: "Enter a valid passport" });
    }

    const passport = await PassportModel.findByIdAndDelete(id);

    if (!passport) {
      return res.status(200).json({
        message: "Passport not found",
      });
    }

    res.status(200).json({ message: "Passports deleted", data: passport });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  CreatePassport,
  GetPassports,
  GetPassport,
  UpdatePassport,
  DeletePassport,
};

// sucess, message, data
// sucess, message, errors
