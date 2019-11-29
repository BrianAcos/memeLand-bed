function usersAuth(req, res, next) {
    if (req.session.name) {
        db.query('SELECT * FROM users WHERE username = ?', [req.body.username], function (err, usuario) {
            if (err || usuario.length === 0) {
                res.render('ERROR')
            } else {
                req.user = usuario[0];
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
};

module.export = usersAuth;