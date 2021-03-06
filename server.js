// requiero a babel
require('@babel/register')({
    ignore: ['node_modules'],
  });

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

// Configuraciones de express para ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');

//configurar express-session
app.use(session({
    secret: 'mySecret',
    cookie: {maxAge: 43200000}, //12horas
    resave: false,
    saveUninitialized: true,
}));

//importo coneccion a la Data Base
const db = require('./services/db-connection');

//numero para bcrypt
const saltRounds = 10;

//decirle a express que use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//configurar multer
const upload = multer({ dest: 'dist/memes/' });

//rutas
app.use('/api', apiRouter);
app.use(appRouter);


//login usuario
app.post('/login', function(req, res) {
    db.query('SELECT * FROM users WHERE username = ?', [req.body.username], function (err, result) {
        if (result.length === 0) {
            res.send('DATOS INVALIDOS');
        } else {
            bcrypt.compare(req.body.password, result[0].password, function (err, resu) {
                if (resu == true) {
                    req.session.userId = {
                        username: result[0].username,
                        administrador: result[0].administrador,
                    };
                    res.redirect(req.headers.referer);
                } else { 
                    res.send('DATOS INVALIDOS');
                }
            });
        }
    });
});

app.get('/api/cerrarSesion', (req, res) => {
    req.session.userId = {
        username: null,
        administrador: null,
    };
    res.redirect('/');
});

module.exports = app;