const router = require("express").Router();

require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Auth = require("./auth-model");

const { JWT_SECRET, ROUNDS } = process.env;

router.post("/register", async (req, res, next) => {
  const newUser = req.body;

  try {
    const hash = bcrypt.hashSync(newUser.password, Number(ROUNDS));
    newUser.password = hash;
    const createdUser = await Auth.add(newUser);

    res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await Auth.findByEmail(req.body.email);
    if (!user) {
      res.status(404).json({
        status: "fail",
        message: "Invalid email or password.",
      });
    }
    const compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare) {
      res.status(404).json({
        status: "fail",
        message: "Invalid email or password.",
      });
    } else {
      const token = makeToken(user);
      res.status(200).json({
        message: `Welcome ${user.firstname}`,
        token: token,
        userID: user.userID,
        isPremium: user.isPremium,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

function makeToken(user) {
  const payload = {
    subject: user.userID,
    email: user.email,
    premium: user.isPremium,
  };
  const options = {
    expiresIn: "1d",
  };
  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
}

module.exports = router;
