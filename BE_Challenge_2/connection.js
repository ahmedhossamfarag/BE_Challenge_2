var mysql = require('mysql');
var query = require('./query')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "World"
});

con.connect(function (err) {
    if (err) console.log(err);
    else console.log("Connected!");
    var sql = query.table
    con.query(sql, function (err, res) {
        if (err) console.log(err)
        else console.log("Table Done")
    })
});

exports.connection = con