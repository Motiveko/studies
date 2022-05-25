module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current", // 최신버전
        },
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
};
