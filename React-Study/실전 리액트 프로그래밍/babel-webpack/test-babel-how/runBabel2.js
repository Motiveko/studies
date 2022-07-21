const babel = require('@babel/core');
const fs = require('fs');

const filename = './src/code.js';
const source = fs.readFileSync(filename, 'utf8');
const presets = ['@babel/preset-react'];

const { ast } = babel.transformSync(source, {
  filename,
  // code 생성 하지 않고 ast 생성까지만 한다.
  ast: true,
  code: false,
  // 프리셋만 적용한 ast
  presets,
  configFile: false,
})

// ast에서 템플릿 리터럴 플러그인을 적용해서 코드로 변환
const { code: code1 } = babel.transformFromAstSync(ast, source, {
  filename,
  plugins: ['@babel/plugin-transform-template-literals'],
  configFile: false,
})

// ast에서 arrow function 플러그인을 적용해서 코드로 변환
const { code: code2 } = babel.transformFromAstSync(ast, source, {
  filename,
  plugins: ['@babel/plugin-transform-arrow-functions'],
  configFile: false,
});

console.log('code1 ===> \n', code1)
console.log('code2 ===> \n', code2)