const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const fs = require('fs');
try{
  fs.readdirSync('uploads');
} catch(error) {
  console.error('uploads 폴더가 없어 uploads 폴더 생성함');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
  }),
  limits: { fileSize: 5*1024*1024}
});

app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file, req.body);
  res.send('ok')
})

app.post('/upload', upload.array('many'), (req, res) => {
  console.log(req.files, req.body);
  res.send("ok");
})

app.post('/upload', upload.fields([{name: 'image1'}, {name: 'image2'}]), (req, res) => {
  console.log(req.files, req.body);
  res.send("ok");
});

app.post('/upload', upload.none(), (req, res) => {
  console.log(req.body);
  res.send('ok')
});