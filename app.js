const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const UserRoutes = require('./routes/UserRoutes');
const cors = require('cors');
const ReportRoute = require('./routes/ReportRoute')
// const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(cors());

app.use(bodyParser.json());

app.use('/', UserRoutes);
app.use('/', ReportRoute);
// app.use('/directions', createProxyMiddleware({
//     target: 'https://maps.googleapis.com/maps/api',
//     changeOrigin: true,
//     pathRewrite: {
//       '^/directions': '/directions',
//     },
//   }));
  

module.exports = app;