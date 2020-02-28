var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
app.options('*', cors());
var port = process.env.PORT || 8080;
var con = require('mssql');
var config = require('./db_config');
var jwt = require('express-jwt');
var jwt_sign = require('jsonwebtoken');
app.use(express.static('assets'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


con.connect(config, err => {
    if (err) {
        throw err;
    }
    console.log("Connection to MSSQL Successful !");

});
app.listen(port);
console.log('The magic happens on port ' + port);

async function getTokenFromHeader(req) {
    var token = '';
    
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];

    }
    let promise = new Promise((resolve, reject) => {
        jwt_sign.verify(token, 'secret', function (err, decoded) {
            console.log(decoded)
            resolve(decoded);


        });

    });

    return await promise;




    // return jwt({
    //     secret: 'secret', // Тут должно быть то же самое, что использовалось при подписывании JWT

    //     userProperty: 'token', // Здесь следующее промежуточное ПО сможет найти то, что было закодировано в services/auth:generateToken -> 'req.token'

    //     getToken: token, // Функция для получения токена аутентификации из запроса
    //   });
}

app.post('/signin', function (req, res) {


    var email = req.body.email;
    var password = req.body.password;
    console.log(JSON.stringify(req.body));
    var sqlStr = '';

    if (email && password) {
        sqlStr = "select Employee.*, Company.Logo, Company.Color1 from Employee left join Company on Company.CompanyID = Employee.EmployeeID where Email = '" + email + "' and Password = '" + password + "'";

        new con.Request().query(sqlStr, function (err, result) {

            if (err) {
                res.end(JSON.stringify(err));
            }
            else if (result.recordset.length === 0) {
                res.end("fail");
            }
            else {

                const data = {
                    _id: result.recordset[0].EmployeeID,
                    name: result.recordset[0].UserName,
                    email: result.recordset[0].Email,
                    logo: result.recordset[0].Logo,
                    color: result.recordset[0].Color1
                };
                const signature = 'secret';
                const expiration = '6h';

                res.send(jwt_sign.sign({ data, }, signature, { expiresIn: expiration }));




            }

        });

    }







});




/////////////universal api//////////////////////////////////
function api_impl(req, res) {
    var tableName = req.params.tableName;
    var action = req.params.action;
    var idName = req.params.idName;
    var sqlStr = '';
    var id = '';

    if (action === 'post') {
        sqlStr = "INSERT INTO " + tableName + " (";
        for (var i = 0; i < Object.keys(req.body).length; i++) {
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
        id = req.body[idName];
        sqlStr = "update " + tableName + " set ";
        for (i = 0; i < Object.keys(req.body).length; i++) {
            if (Object.keys(req.body)[i] === idName) {
                continue;
            }
            sqlStr = sqlStr + Object.keys(req.body)[i] + "='" + req.body[Object.keys(req.body)[i]] + "',"
        }
        sqlStr = sqlStr.substring(0, sqlStr.length - 1);
        sqlStr = sqlStr + " where " + idName + " = " + id;

        new con.Request().query(sqlStr, function (err, result) {
            if (err)
                res.end(JSON.stringify(err));
            res.end(JSON.stringify(result));

        });
    }

    if (action === 'delete') {
        id = req.body[idName];
        sqlStr = "delete from " + tableName + " where " + idName + " = " + id;

        new con.Request().query(sqlStr, function (err, result) {
            if (err)
                res.end(JSON.stringify(err));
            res.end(JSON.stringify(result));

        });


    }
    if (action === 'get') {
        id = req.body[idName];


        if (id) {
            sqlStr = "select * from " + tableName + " where " + idName + " = " + id;
        }
        else {
            sqlStr = "select * from " + tableName;
        }


        new con.Request().query(sqlStr, function (err, result) {
            if (err)
                res.end(JSON.stringify(err));
            res.end(JSON.stringify(result));

        });


    }
}

app.post('/table/:tableName/action/:action/idName/:idName', function (req, res) {

    getTokenFromHeader(req).then((value) => {
        var now = Math.floor(Date.now() / 1000);
        // console.log(Math.floor(Date.now() / 1000));
        if (value && now > value.exp) {
            res.end("auth_expired");
        }
        else if(value===''){
            res.end("need_auth");
        }
        else {
            api_impl(req, res);
        }
    });




});





//////////////////////////////////////////////

app.post('/userinfo', function (req, res) {

    getTokenFromHeader(req).then(function(response) {
        
        res.end(JSON.stringify(response));
    });




});

app.post('/checkauth', function (req, res) {

    getTokenFromHeader(req).then((value) => {
        var now = Math.floor(Date.now() / 1000);
        // console.log(Math.floor(Date.now() / 1000));
        if (value && now > value.exp) {
            res.end("auth_expired");
        }
        else if(value===''){
            res.end("need_auth");
        }
        else {
            res.end("checked");
        }
    });




});