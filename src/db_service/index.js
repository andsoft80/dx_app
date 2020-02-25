var express  = require('express');
var app      = express();
var cors = require ('cors');
app.use(cors());
app.options('*', cors());
var port     = process.env.PORT || 8080;
var con = require('mssql');
var config = require('./db_config');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// var jsonParser = bodyParser.json()


console.log(config.server);
con.connect(config, err => { 
    if(err){
        throw err ;
    }
    console.log("Connection Successful !");

    new con.Request().query('select 1 as number', (err, result) => {
        //handle err
        console.dir(result)
        // This example uses callbacks strategy for getting results.
    })
        
});
app.listen(port);
console.log('The magic happens on port ' + port);

/////////////universal api//////////////////////////////////
app.post('/table/:tableName/action/:action/idName/:idName', function (req, res) {
    var tableName = req.params.tableName;
    var action = req.params.action;
    var idName = req.params.idName;

    if (action === 'post') {
        sqlStr = "INSERT INTO " + tableName + " (";
        for (i = 0; i < Object.keys(req.body).length; i++) {
            sqlStr = sqlStr + Object.keys(req.body)[i] + ",";
        }
        sqlStr = sqlStr.substring(0, sqlStr.length - 1);
        sqlStr = sqlStr + ") VALUES (";
        for (i = 0; i < Object.keys(req.body).length; i++) {
            sqlStr = sqlStr + "'" + req.body[Object.keys(req.body)[i]] + "',";
        }
        sqlStr = sqlStr.substring(0, sqlStr.length - 1);
        sqlStr = sqlStr + ")";

        new con.Request().query(sqlStr, function (err, result) {
            if (err)
                res.end(JSON.stringify(err));
            res.end(JSON.stringify(result));

        });
    }
    if (action === 'put') {
        var id = req.body[idName];
        sqlStr = "update " + tableName + " set ";
        for (i = 0; i < Object.keys(req.body).length; i++) {
            if (Object.keys(req.body)[i] === idName) {
                continue;
            }
            sqlStr = sqlStr + Object.keys(req.body)[i] + "='" + req.body[Object.keys(req.body)[i]] + "',"
        }
        sqlStr = sqlStr.substring(0, sqlStr.length - 1);
        sqlStr = sqlStr + " where "+idName+" = " + id;

        new con.Request().query(sqlStr, function (err, result) {
            if (err)
                res.end(JSON.stringify(err));
            res.end(JSON.stringify(result));

        });
    }

    if (action === 'delete') {
        var id = req.body[idName];
        sqlStr = "delete from " + tableName + " where "+idName+" = " + id;
        
        new con.Request().query(sqlStr, function (err, result) {
            if (err)
                res.end(JSON.stringify(err));
            res.end(JSON.stringify(result));

        });


    }
    if (action === 'get') {
        var id = req.body[idName];
        
        
        if(id){
            sqlStr = "select * from " + tableName + " where "+idName+" = " + id;
        }
        else{
            sqlStr = "select * from " + tableName;
        }
        
        
        new con.Request().query(sqlStr, function (err, result) {
            if (err)
                res.end(JSON.stringify(err));
            res.end(JSON.stringify(result));

        });


    }    


});

//////////////////////////////////////////////



