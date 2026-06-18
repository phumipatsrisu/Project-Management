const { authCheck } = require("../middleware/auth");

const router = require("express").Router();

router.get("/product", authCheck, (req, res) => {
  res.json({ message: "Hello Product" });
});

module.exports = router;
