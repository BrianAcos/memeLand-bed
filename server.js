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
const upload = multer({ dest: 'public/memes/' });

//rutas
app.use('/api', apiRouter);
app.use(appRouter);


//login usuario
app.post('/login', function(req, res) {
    db.query('SELECT * FROM users WHERE username = ?', [req.body.username], function (err, result) {
        if (result.length === 0) {
            res.end('DATOS INVALIDOS1');
        } else {
            bcrypt.compare(req.body.password, result[0].password, function (err, resu) {
                if (resu == true) {
                    req.session.userId = {
                        username: result[0].username
                    };
                    res.end('TE HAS LOGEADO DATOS CORRECTOS')
                } else { 
                    res.end('DATOS INVALIDOS2');
                }
            });
        }
    });
});


app.get('/123', (req, res) => {if (req.session.name) { res.send('sape')} else {res.send('noooooo')}});

module.exports = app;