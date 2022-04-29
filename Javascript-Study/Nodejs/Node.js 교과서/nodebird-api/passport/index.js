const passport = require("passport");
const local = require("./localStrategy");
// const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
  // 로그인시 실행, req.session 객체에 어떤 데이터를 저장할지 정한다.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // passport.session가 매 요청시 실행, req.session에 저장한 id를 인수로 받는다. id를 이용해 db에서 사용자 정보를 조회
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  // kakao();
};
