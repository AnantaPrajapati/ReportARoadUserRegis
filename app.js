const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const UserRoutes = require('./routes/UserRoutes');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

app.use('/', UserRoutes);

module.exports = app;