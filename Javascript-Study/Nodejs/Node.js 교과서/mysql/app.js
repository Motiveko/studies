const express = require("express");
const path = require("path");
const morgan = require("morgan");

const { sequelize } = require("./models");

const app = express();

app.set("port", process.env.PORT || 3001);
app.set("view engine", "html");

sequelize
  .sync({ force: false })
  .then(() => console.log("데이터 베이스 연결 성공"))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.send("안녕하세요?");
});

const PORT = app.get("port");
app.listen(PORT, () => {
  console.log(`${PORT}에서 express 실행중..`);
});
