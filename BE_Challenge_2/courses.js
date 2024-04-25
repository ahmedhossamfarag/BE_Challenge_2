var query = require('./query')

function badRequest(res, err) {
    res.writeHead(400)
    res.end(`${err}`)
}

exports.get = function (urlQ, res, con) {
    con.query(urlQ.pref ? query.select(urlQ.pref) : query.selectAll,
        function (err, result) {
            if (err) {
                badRequest(res, err)
            }
            else {
                res.writeHead(200)
                res.end(JSON.stringify(result))
            }
        })
}


exports.create = function (form, res, con) {
    con.query(query.create(form),
        function (err) {
            if (err) {
                badRequest(res, err)
            }
            else {
                res.writeHead(201)
                res.end()
            }
        })
}


exports.update = function (form, res, con) {
    try {
        con.query(query.update(form),
            function (err, result) {
                if (err) {
                    badRequest(res, err)
                }
                else {
                    if (result.affectedRows > 0) {
                        res.writeHead(202)
                    }
                    else {
                        res.writeHead(204)
                    }
                    res.end()
                }
            })
    } catch (ex) {
        badRequest(res, ex)
    }
}


exports.delete = function (urlQ, res, con) {
    try {
        if (urlQ.id) {
            con.query(query.delete(urlQ.id),
                function (err, result) {
                    if (err) {
                        badRequest(res, err)
                    }
                    else {
                        if (result.affectedRows > 0) {
                            res.writeHead(202)
                        }
                        else {
                            res.writeHead(204)
                        }
                        res.end()
                    }
                })
        }
        else {
            badRequest(res, "no id available")
        }
    } catch (ex) {
        badRequest(res, ex)
    }
}

