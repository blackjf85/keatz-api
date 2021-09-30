const express = require("express");
const app = express();

const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(helmet());
app.use(cors());

app.get("/", async (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "Welcome to the Keatz API",
    });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = app;
