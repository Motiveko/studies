const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const User = require("../models/user");

module.exports = () =>
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: process.env.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("사용자 : ", profile.id);
        try {
          const { id, displayName } = profile;
          const { email } = profile._json.kakao_account;

          const exUser = await User.findOne({
            where: {
              snsId: id,
              provider: "kakao",
            },
          });
          if (!exUser) {
            const newUser = await User.create({
              email,
              nick: displayName,
              snsId: id,
              provider: "kakao",
            });
            return done(null, newUser);
          }

          return done(null, exUser);
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
