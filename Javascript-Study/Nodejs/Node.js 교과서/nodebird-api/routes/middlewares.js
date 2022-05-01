const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const Domain = require("../models/domain");

exports.isLoggedIn = (req, res, next) => {
  //  Passport가 req 객체에 추가하는 메서드
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다");
    res.redirect(`/?error=${message}`);
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다.",
      });
    }
  }
  return res.status(401).json({
    code: 401,
    message: "유효하지 않은 토큰입니다.",
  });
};

const isPremiumReq = async (req) => {
  const { type } = req.user;
  const { clientSecret } = req.body;

  if (type) {
    return type === "premium";
  }
  if (clientSecret) {
    const domain = await Domain.findOne({
      where: {
        clientSecret,
      },
    });

    return domain.type === "premium";
  }
  return false;
};

const premiumCount = 2;
const freeCount = 1;

exports.apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: async (req) => {
    const isPremium = await isPremiumReq(req);
    return isPremium ? premiumCount : freeCount;
  },
  async handler(req, res) {
    if (!this.customMessage) {
      const isPremium = await isPremiumReq(req);
      const message = `${isPremium ? "프리미엄" : "무료"} 요금제는 1분에 ${
        isPremium ? premiumCount : freeCount
      } 번만 요청할 수 있습니다.`;
      this.customMessage = message;
    }
    res.status(this.statusCode).json({
      code: this.statusCode, // 기본값: 429
      message: this.customMessage,
    });
  },
});

exports.deprecated = (req, res) => {
  res.status(410).json({
    code: 410,
    message: "새로운 버전이 나왔습니다. 새로운 버전을 사용하세요",
  });
};
