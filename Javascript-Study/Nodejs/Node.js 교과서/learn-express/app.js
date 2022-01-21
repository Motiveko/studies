const express = require('express');
const path = require('path');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const { dirname } = require('path');



// const app = express();
// app.set('port', process.env.PROT || 3000);

// app.get('/', (req, res) => {
//   // res.send('Motiveko is ready!'); // 일반 응답
//   res.sendFile(path.join(__dirname, 'index.html')); // 파일로 응답
// });

// app.listen(app.get('port'), () => {
//   console.log(app.get('port'), '번 포트에서 대기중');
// })


// ==== 미들웨어 사용 ====
dotenv.config();
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(morgan('dev')); // morgan : 요청과 응답에 대한 정보를 콘솔에 기록
// app.use('/', express.static(path.join(__dirname, 'public'))); // static : 정적인 파일들을 제공하는 라우터
app.use(express.json());  // body-parser
app.use(express.urlencoded({ extended: false })); // body-parser
app.use(cookieParser('process.env.COOKIE_SECRET')); // 
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'process.env.COOKIE_SECRET',
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie'
}))

// 모든요청에 대한 미들웨어
app.use((req, res, next) => {

  console.log('모든 요청에 대해 다 실행됩니다.');
  next();
})

// 핸들러(미들웨어)를 여러개 등록할 수 있다.
app.get('/', (req, res, next) => {
  console.log('GET / 요청에 대해서만 실행함')
  next();
}, (req, res) => {
  // throw new Error('에러는 에러 처리 미들웨어로 간다.')
});


app.get('/', (req, res) => {
  // res.send('Motiveko is ready!'); // 일반 응답
  // res.cookie('foo', 'bar', {
  //   expires: new Date(Date.now() + 100_000),
  //   httpOnly: true,
  //   secure: true, 
  //   signed: true
  // })
  
  res.sendFile(path.join(__dirname, 'index.html')); // 파일로 응답
});

// 에러처리 미들웨어는 가급적 가장 아래에 위치하게 한다.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
  next();
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
})