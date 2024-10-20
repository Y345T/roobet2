const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());

app.use('/roobet', createProxyMiddleware({
  target: 'https://roobetconnect.com',
  changeOrigin: true,
  pathRewrite: {
    '^/roobet': '/affiliate/v2/stats',
  },
  onProxyReq: (proxyReq) => {
    console.log(`Using API Key: ${process.env.API_KEY}`);
    proxyReq.setHeader('Authorization', `Bearer ${process.env.API_KEY}`);
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0');  // Adding User-Agent header
  },
  onError: (err, req, res) => {
    console.error('Error in proxy:', err);
  },
  onProxyRes: (proxyRes) => {
    console.log('Proxy response headers:', proxyRes.headers);
  }
}));

app.listen(3001, () => {
  console.log('Proxy server is running on http://localhost:3001');
});