var express  = require('express');
var app      = express();
var cors = require ('cors');
app.use(cors());
app.options('*', cors());
var port     = process.env.PORT || 8080;
var bodyParser   = require('body-parser');
var sql = require('mssql');
var config = require('./db_config');
app.use(bodyParser()); // get information from html forms

console.log(config.server);
sql.connect(config, err => { 
    if(err){
        throw err ;
    }
    console.log("Connection Successful !");

    new sql.Request().query('select 1 as number', (err, result) => {
        //handle err
        console.dir(result)
        // This example uses callbacks strategy for getting results.
    })
        
});

app.listen(port);
console.log('The magic happens on port ' + port);

