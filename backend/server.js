const express = require('express');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();
require('./config/database');
const isDevelopment = process.env.NODE_ENV === 'development';
const HOST = isDevelopment ? 'localhost' : '0.0.0.0';

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));
app.use(logger('dev'));
app.use(express.json());


app.use(require('./config/checkToken'));
app.use('/api/users', require('./routes/api/users'));


const port = process.env.PORT || 3001;

app.listen(port, HOST, function() {
  console.log(`Express app running on port ${port}`);
});