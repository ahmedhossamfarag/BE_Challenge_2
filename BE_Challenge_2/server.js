'use strict';
var http = require('http');
var port = process.env.PORT || 8080;
var con = require('./connection');
var url = require('url');
var formidable = require('formidable');
var courses = require('./courses')

http.createServer(function (req, res) {

    const notfound = function () {
        res.writeHead(404)
        res.end("not found")
    }

    var urlData = url.parse(req.url, true);

    switch (req.method) {
        case 'GET': {
            if (urlData.pathname == '/') {
                courses.get(urlData.query, res, con.connection)
            }
            else {
                notfound()
            }
            break;
        }
        case 'POST': {
            var form = new formidable.IncomingForm();
            if (urlData.pathname == '/Create.html') {
                form.parse(req, function (err, fields, files) {
                    courses.create(fields, res, con.connection)
                });
            }
            else if (urlData.pathname == '/Update.html') {
                form.parse(req, function (err, fields, files) {
                    courses.update(fields, res, con.connection)
                });
            }
            else {
                notfound()
            }
            break;
        }
        case 'DELETE': {
            if (urlData.pathname == '/') {
                courses.delete(urlData.query, res, con.connection)
            }
            else {
                notfound()
            }
            break;
        }
        default: {
            notfound()
        }
    }
}).listen(port);
