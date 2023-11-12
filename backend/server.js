const express = require('express');
const cors = require('cors');
const logger = require('morgan');

require('dotenv').config();
require('./config/database');
const isDevelopment = process.env.NODE_ENV === 'development';
const HOST = isDevelopment ? 'localhost' : '0.0.0.0';

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


app.use(require('./config/checkToken'));
app.use('/api/users', require('./routes/api/users'));


const port = process.env.PORT || 3001;

app.listen(port, HOST, function() {
  console.log(`Express app running on port ${port}`);
});