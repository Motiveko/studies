const jwt = require("jsonwebtoken");

const { verifyToken, apiLimiter } = require("./middlewares.js");
const { Domain, User, Post, Hashtag } = require("../models");
const { hash } = require("bcrypt");

const router = require("express").Router();

router.post("/token", apiLimiter, async (req, res) => {
  try {
    const { clientSecret } = req.body;

    const domain = await Domain.findOne({
      where: {
        clientSecret,
      },
      include: {
        model: User,
        attributes: ["nick", "id"],
      },
    });

    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: "등록되지 않은 도메인입니다. 먼저 도메인을 등록해주세요",
      });
    }

    const { id, nick } = domain.User;
    const { type } = domain;
    const token = jwt.sign({ id, nick, type }, process.env.JWT_SECRET, {
      expiresIn: "10m",
      issuer: "motiveko",
    });

    return res.json({
      code: 200,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
});

router.get("/post/my", apiLimiter, verifyToken, (req, res) => {
  const { id } = req.decoded;
  Post.findAll({ where: { userId: id } })
    .then((posts) => {
      res.json({
        code: 200,
        payload: posts,
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: "포스트 조회중 오류가 발생하였습니다.",
      });
    });
});
router.get(
  "/posts/hashtag/:title",
  apiLimiter,
  verifyToken,
  async (req, res) => {
    try {
      const { title } = req.params;

      const hashtag = await Hashtag.findOne({ where: { title } });
      if (!hashtag) {
        res.status(404).json({
          code: 404,
          message: "검색 결과가 없습니다.",
        });
      }

      const posts = await hashtag.getPosts();
      return res.json({
        code: 200,
        payload: posts,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: "포스트 조회중 오류가 발생하였습니다.",
      });
    }
  }
);

module.exports = router;
