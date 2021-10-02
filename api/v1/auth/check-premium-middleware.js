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

module.exports = { checkPremium };
