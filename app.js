var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var dust = require('dustjs-helpers');
var pg = require('pg');
var app = express();
var routes = require('./routes/index');

//database connect string
/*const config = {
  user:'postgres',
  database:'mike',
  password:'mar20052019$',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 3000,
}*/
//pool takes the object above config as parameter
//const pool = new pg.Pool(config);

//assing dust engine to .dust files
app.engine('dust', cons.dust);

//set default ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
//app.use(bodyParser.urlencoded({ extend: true}));
app.use(bodyParser.json());

//to use routes
app.use('/', routes);


module.exports = app;

// server

/*app.listen(3000, function(){
  console.log('server started on port 3000');
})*/
