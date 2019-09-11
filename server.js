// server.js
// where your node app starts

// init project
const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');

const cors = require('cors');
const bodyParser = require('body-parser');

const urlHandler = require('./controllers/urlHandler.js');

const app = express();

// Basic Configuration for Heroku
const mongoURL = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

mongoose.connect(mongoURL);

app.use(cors());
app.use(bodyParser.urlencoded({'extended': false}));

// http://expressjs.com/en/starter/static-files.html
app.use('/public', express.static(process.cwd() + '/public'));


// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl/new', urlHandler.addUrl);
  
app.get('/api/shorturl/:shurl', urlHandler.processShortUrl);


// Answer not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// listen for requests :)
app.listen(process.env.PORT || port, () =>{
   console.log('Server is running on port: '+ port);
});

