const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

const restricted = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      status: "fail",
      meessage: "You must be logged in.",
    });
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          status: "fail",
          message: "Bad token",
          err: err.message,
        });
      } else {
        req.decodedToken = decoded;
        next();
      }
    });
  }
};

module.exports = { restricted };
