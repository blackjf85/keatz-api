const Auth = require("./auth-model");

const checkPremium = (req, res, next) => {
  if (req.decodedToken.isPremium === true) {
    next();
  } else {
    res.status(403).json({
      status: "fail",
      message: "Access to resource unauthorized",
    });
  }
};

const checkPayload = async (req, res, next) => {
  const newUser = req.body;
  try {
    if (
      !newUser.email ||
      !newUser.firstname ||
      !newUser.lastname ||
      !newUser.password
    ) {
      res.status(401).json({
        status: "fail",
        message: "Email. first name, last name and password are required.",
      });
    } else {
      const uniqueEmail = await Auth.findByEmail(newUser.email);
      if (!uniqueEmail) {
        next();
      } else {
        res.status(401).json({
          status: "fail",
          message: "That email is already in use.",
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkPremium,
  checkPayload,
};
