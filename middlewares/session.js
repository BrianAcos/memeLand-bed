
//login usuario
app.post('/api/login', function(req, res) {
    db.query('SELECT * FROM users WHERE username = ?', [req.body.username], function (err, result) {
        if (result.length === 0) {
            res.end('DATOS INVALIDOS1');
        } else {
            bcrypt.compare(req.body.password, result[0].password, function (err, resu) {
                if (resu == true) {
                    req.session.name = req.body.username
                    res.end('TE HAS LOGEADO DATOS CORRECTOS')
                } else { 
                    res.end('DATOS INVALIDOS2');
                }
            });
        }
    });
});