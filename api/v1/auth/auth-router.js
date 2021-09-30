const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Hello from the auth route.",
  });
});

module.exports = router;
