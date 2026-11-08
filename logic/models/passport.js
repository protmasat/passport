/*
Type
State code
Passport number
Surname
Name
Nationality
Date of birth
Sex
Issue date
Expiry date
Place of birth
Issuing authority
Electronically printed signature
*/

const countries = require("../utils/countries");
const mongoose = require("mongoose");
const passportSchema = new mongoose.Schema(
  {
    passportType: {
      type: String,
      required: true,
      uppercase: true,
    },
    stateCode: {
      type: String,
      required: true,
      uppercase: true,
    },
    surname: {
      type: String,
      required: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: true,
      uppercase: true,
    },
    nationality: {
      type: String,
      enum: countries,
      required: true,
      // uppercase: true,
    },
    placeOfBirth: {
      type: String,
      required: true,
      uppercase: true,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    issueDate: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
    placeOfBirth: {
      type: String,
      required: true,
      uppercase: true,
    },
    issuingAuthority: {
      type: String,
      required: true,
      uppercase: true,
    },
    electronicallPrintedSignature: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const PassportModel = mongoose.model("Passport", passportSchema);
module.exports = PassportModel;
