const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./middlewares.js");
const Domain = require("../models/domain");
const { v4: uuidv4 } = require("uuid");
const { body, oneOf, validationResult } = require("express-validator");
const { validatorErrorChecker } = require("../middlewares/validationChecker");

router.get("/", isLoggedIn, (req, res) => {
  const { nick } = req.user;
  res.send(`안녕하세요 ${nick}님`);
});

router.post(
  "/domain",
  isLoggedIn,
  oneOf([body("host").isIP(), body("host").isURL()]),
  body("type").isIn(["free", "premium"]),
  validatorErrorChecker,
  async (req, res, next) => {
    const { id: UserId } = req.user;
    const { host, type } = req.body;
    try {
      await Domain.create({
        UserId,
        host,
        type,
        clientSecret: uuidv4(),
      });

      res.redirect("/");
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

module.exports = router;
