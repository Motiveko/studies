import Ts from 'rollup-plugin-typescript2';
 
export default {
  input: [
    'src/index.ts',
    'src/atoms/Color/index.ts'
  ],
  output: {
    dir: 'lib',
    format: 'esm', // es module
    sourcemap: true
  },
  plugins: [Ts()],
  preserveModules: true,  // preserve the structure of source folder , 안하면 lib에 js파일이 죄다 들어가있다.(atoms 내부에는 d.ts 파일만)
  external: ['react'] // 외부 모듈
}