const babel = require('@babel/core');
const fs = require('fs');

const filename = './src/code.js';
const source = fs.readFileSync(filename, 'utf8');
const presets = ['@babel/preset-react'];
const plugins = [
  '@babel/plugin-transform-template-literals',
  '@babel/plugin-transform-arrow-functions'
];

const { code } = babel.transformSync(source, {
  filename, // 에러 발생시 사용될 원본 파일이름
  presets,
  plugins,
  configFile: false // babel.config.js 파일을 사용하지 않는다.
});

console.log(code);