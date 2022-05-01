const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const { validatorErrorChecker } = require("../middlewares/validationChecker");
const Domain = require("../models/domain");
const User = require("../models/user");
const Post = require("../models/post");
const Hashtag = require("../models/hashtag");

const { verifyToken } = require("./middlewares");

router.post(
  "/token",
  body("clientSecret")
    .isUUID()
    .withMessage("올바르지 않은 clientSecret 값입니다."),
  validatorErrorChecker,
  async (req, res, next) => {
    const { clientSecret } = req.body;
    try {
      const domain = await Domain.findOne({
        where: { clientSecret },
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
      const token = jwt.sign({ id, nick }, process.env.JWT_SECRET, {
        expiresIn: "10m",
        issuer: "motiveko",
      });
      return res.json({
        code: 200,
        message: "토큰이 발급되었습니다",
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: "서버 에러",
      });
    }
  }
);

router.get("/test", verifyToken, (req, res) => {
  res.json(req.decoded);
});

router.get("/posts/my", verifyToken, (req, res) => {
  Post.findAll({ where: { userId: req.decoded.id } })
    .then((posts) => {
      console.log(hashtags);
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

router.get("/posts/hashtag/:title", verifyToken, async (req, res) => {
  try {
    const hashtag = await Hashtag.findOne({
      where: { title: req.params.title },
    });
    if (!hashtag) {
      return res.status(404).json({
        code: 404,
        message: "검색 결과가 없습니다.",
      });
    }
    const posts = await hashtag.getPosts({ joinTableAttributes: [] });

    return res.json({
      code: 200,
      payload: posts,
    });
  } catch (error) {}
});

module.exports = router;
