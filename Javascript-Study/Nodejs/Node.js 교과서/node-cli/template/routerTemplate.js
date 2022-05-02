import * as express from "express";
const _router = express.Router();

_router.get("/", (req, res, next) => {
  try {
    res.send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export const router = _router;
