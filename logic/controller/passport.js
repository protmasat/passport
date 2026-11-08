// CREATE
const mongoose = require("mongoose");
const PassportModel = require("../models/passport");

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

    const validSex = ["male", "female"];

    if (!validSex.includes(sex)) {
      return res.status(400).json({
        sucess: true,
        message: "Not valid sex",
        data: {},
      });
    }

    const newPassport = await PassportModel.create({
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
        .json({ sucess: false, message: "Passport not found!", data: {} });
    }

    res
      .status(201)
      .json({ sucess: true, message: "New passport added", data: newPassport });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ sucess: false, message: "Internal server error", data: {} });
  }
};

const GetPassports = async (req, res) => {
  try {
    const passports = await PassportModel.find().sort({ createdAt: -1 });

    if (passports.length === 0) {
      return res.status(200).json({
        sucess: true,
        message: "No passport found",
        data: {},
      });
    }

    res
      .status(200)
      .json({ sucess: true, message: "Passports retrieved", data: passports });
  } catch (error) {
    res
      .status(500)
      .json({ sucess: false, message: "Internal server error", data: {} });
  }
};

const GetPassport = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({
        message: "Enter valid passport",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "Passport not found!",
      });
    }

    const passport = await PassportModel.findById(id);

    if (!passport) {
      return res.status(200).json({
        sucess: true,
        message: "Passport not found",
        data: {},
      });
    }

    res
      .status(200)
      .json({ sucess: true, message: "Passport retrieved", data: passport });
  } catch (error) {
    res
      .status(500)
      .json({ sucess: false, message: "Internal server error", data: {} });
  }
};

const UpdatePassport = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ sucess: false, message: "Enter a valid passport", data: {} });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        sucess: false,
        message: "Passport not found!",
        data: {},
      });
    }

    console.log(req.body);

    const updatedPassport = await PassportModel.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      sucess: true,
      message: "Passport updated",
      data: updatedPassport,
    });
  } catch (error) {
    res
      .status(500)
      .json({ sucess: false, message: "Internal server error", data: {} });
  }
};

const DeletePassport = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ sucess: false, message: "Enter a valid passport", data: {} });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        sucess: false,
        message: "Passport not found!",
        data: {},
      });
    }

    const passport = await PassportModel.findByIdAndDelete(id);

    if (!passport) {
      return res
        .status(200)
        .json({ sucess: true, message: "Passport not found", data: {} });
    }

    res
      .status(200)
      .json({ sucess: true, message: "Passport deleted", data: passport });
  } catch (error) {
    res
      .status(500)
      .json({ sucess: false, message: "Internal server error", data: {} });
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
