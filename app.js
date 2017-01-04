'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();

const knex = require('knex');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

switch (app.get('env')) {
case 'development':
  {
    app.use(morgan('dev'));
    break;
  }
case 'production':
  {
    app.use(morgan('short'));
    break;
  }
}

app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());
const path=require('path');
app.use(express.static(path.join('public')));

const puppies = require('./routes/puppies');

app.use(puppies);


module.exports=app;
