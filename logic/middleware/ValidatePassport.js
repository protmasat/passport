const ValidatePassport = (req, res, next) => {
  const requiredFields = [
    "passportType",
    "stateCode",
    "surname",
    "name",
    "nationality",
    "dateOfBirth",
    "sex",
    "issueDate",
    "expiryDate",
    "placeOfBirth",
    "issuingAuthority",
    "electronicallPrintedSignature",
  ];

  console.log(req.headers["content-type"]);
  console.log(req.body);

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: "Missing required fields",
      fields: missingFields,
    });
  }

  next();
};

module.exports = ValidatePassport;
