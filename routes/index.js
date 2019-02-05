var express = require('express');
var router = express.Router();
var pg = require('pg');
//database connect string
const config = {
  user:'postgres',
  database:'mike',
  password:'mar20052019$',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 3000,
}
//pool takes the object above config as parameter
const pool = new pg.Pool(config);


/* GET home page. */
router.get('/', function(req, res){
  pool.connect(function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool' + err);
    }else{
    client.query('SELECT * FROM project WHERE sprint = 5', function(err, result) {

      if(err){
        return console.error('error runing query', err);
        res.status(400).send(err);
      }
      res.render('index', {project: result.rows});
        done();

    });
  }
  });
});

router.get('/description', function(req, res){
  pool.connect(function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool' + err);
    }else{
    client.query('SELECT * FROM project WHERE sprint = 5', function(err, result) {

      if(err){
        return console.error('error runing query', err);
        res.status(400).send(err);
      }
      res.render('index', {project: result.rows});
        done();

    });
  }
  });
});

//POST Method
router.post('/api/v1/mike', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {text: req.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });


    });
});

//GET Method
router.get('/api/v1/mike', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM project ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

//PUT Method
router.put('/api/v1/sampledb/:data_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.data_id;

    // Grab data from http request
    var data = {text: req.body.text, complete: req.body.complete};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

});

//Delete Method
router.delete('/api/v1/sampledb/:data_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.data_id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM items WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

});

module.exports = router;
