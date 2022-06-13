const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

const proxy = createProxyMiddleware('/api', {
      target: 'http://alpha-kiwi-admin-api.kakaomail.io',
      changeOrigin: true,
    })
    
app.use('/api', proxy);
app.listen(3000, () => console.log('APP START'));

