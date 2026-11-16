const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token required",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(_id).select("_id");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }
};

module.exports = requireAuth;
