const { validationResult } = require("express-validator");

exports.validatorErrorChecker = (req, res, next) => {
  const result = validationResult(req);
  const messages = result.array().map(({ msg }) => msg);
  if (!result.isEmpty()) {
    return res.status(400).json({ messages });
  }
  next();
};
