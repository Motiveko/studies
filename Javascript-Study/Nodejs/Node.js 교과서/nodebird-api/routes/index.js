const express = require("express");
const router = express.Router();

router.get("/", isLoggedIn, (req, res) => {
  const { nick } = req.user;
  res.send(`안녕하세요 ${nick}님`);
});

module.exports = router;
