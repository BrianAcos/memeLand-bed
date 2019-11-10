// importo config.js
const config = require('./config');

//importo la index.js de api y app
const apiRouter = require('./api');
const appRouter = require('./app');

//importo modulos
const express = require('express')
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const session = require('express-session');

//Configuro express
const app = express();
app.use(express.static(config.static));

//importo coneccion a la Data Base
const db = require('./services/db-connection');

//numero para bcrypt
const saltRounds = 10;

//decirle a express que use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//configurar multer
const upload = multer({ dest: 'public/memes/' });

//configurar express-session
app.use(session({
    secret: 'my secret',
    cookie: {maxAge: 43200000}, //12horas
    resave: false,
    saveUninitialized: true,
}));

//rutas
app.use('/api', apiRouter);
app.use(appRouter);

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


//Levanto la aplicación
app.listen(config.PORT, function () {
    console.log("App corriendo en el puerto " + config.PORT);
});