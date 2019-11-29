//importo modulos
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const session = require('express-session');
//importo coneccion a la Data Base
const db = require('./services/db-connection');
//importo modules 
const Memes = require('./models/memes');
const Users = require('./models/users');

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

//obtengo todos los memes
// sin promesas
// app.get('/api/memes', function (req, res) {
//     db.query('SELECT * FROM memes', (err, rows, fields) => {
//         if (!err) {
//             res.json(rows);
//         } else {
//             console.log(err);
//         }
//     });
// });
// con promesas
app.get('/api/memes', (req, res) => Memes.getAllMemes()
    .then(function (memes) {
        res.json(memes);
    })
    .catch((err) => {
        console.log(err);
    })
);

//agregar memes
app.post('/api/memes', upload.single('imagen'), function (req, res) {
    db.query('INSERT INTO memes VALUES (0, "brian", ?, null, ?, ?, NOW(), 0, 0, 0, 0)', [req.body.titulo, 'memes/' + req.file.filename, req.body.categoria], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.end('ERROR');
        } else {
            res.end('Agregaste');
        }
    });
});
// app.post('/api/memes', upload.single('imagen'), (req, res) => {
//     const newMeme = new Memes(0, "brian", req.body.titulo, null, 'memes/' + req.file.filename, req.body.categoria, "NOW()", 0, 0, 0, 0)
//      newMeme.save()
//      .then (function())
// });


//obtener usuarios
app.get('/api/users', function (req, res) {
    db.query('SELECT * FROM users', (err, rows, fields) => {
        if (err) {
            res.end('ERROR')
            console.log(err);
        } else {
            res.send(rows)
        }
    });
});

//agregar usuario por primera vez
app.post('/api/users', upload.single('imagen'), function (req, res) {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            res.end('ERROR BCRYPT')
        } else {
            db.query('INSERT INTO users VALUES (?, ?, ?, ?, null, null, null, null, 0, 0)', [req.body.username, hash, req.body.nombre, req.body.email], (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    res.end('ERROR');
                } else {
                    res.end('Agregaste');
                }
            });
        }
    });
});

//login usuario
app.post('/api/login', function(req, res) {
    db.query('SELECT * FROM users WHERE username = ?', [req.body.username], function (err, result) {
        if (result.length === 0) {
            res.end('DATOS INVALIDOS1');
        } else {
            bcrypt.compare(req.body.password, result[0].password, function (err, resu) {
                if (resu == true) {
                    res.end('TE HAS LOGEADO DATOS CORRECTOS')
                } else { 
                    res.end('DATOS INVALIDOS2');
                }
            });
        }
    });
});


//Levanto la aplicación
app.listen(3001, function () {
    console.log("App corriendo en el puerto 3001");
});