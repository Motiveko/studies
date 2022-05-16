import Ts from "rollup-plugin-typescript2";

export default {
  // TODO : 컴포넌트 개발시 모든 index.ts를 자동으로 읽을 수 있도록 코드 개선
  input: [
    "src/index.ts",
    "src/atoms/Color/index.ts",
    "src/atoms/Text/index.ts",
    "src/atoms/Margin/index.ts",
    "src/molecules/Select/index.ts",
  ],
  output: {
    dir: "lib",
    format: "esm", // es module
    sourcemap: true,
  },
  plugins: [Ts()],
  preserveModules: true, // preserve the structure of source folder , 안하면 lib에 js파일이 죄다 들어가있다.(atoms 내부에는 d.ts 파일만)
  external: ["react", "@ds.e/foundation"], // 외부 모듈
};
