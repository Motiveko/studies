const express = require("express");
const app = express();
const path = require("path");
// const multer = require("multer");
// const fs = require("fs");

// dotenv.config();

const indexRouter = require("./routes");
const userRouter = require("./routes/user");
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use((req, res, next) => {
  res.status(404).send("not found");
});

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
