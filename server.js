//importo modulos
const mysql = require('mysql');
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');

//numero para bcrypt
const saltRounds = 10;

//decirle a express que use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//configurar multer
const upload = multer({ dest: 'public/memes/' });

//establesco parametros de coneccion con mi base de datos
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'memeland',
});

//conecto mi base de batos
connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('DB Conected');
    }
});

//obtengo todos los memes
app.get('/api/memes', function (req, res) {
    connection.query('SELECT * FROM memes', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//agregar memes
app.post('/api/memes', upload.single('imagen'), function (req, res) {
    connection.query('INSERT INTO memes VALUES (0, "brian", ?, null, ?, ?, NOW(), 0, 0, 0, 0)', [req.body.titulo, 'memes/' + req.file.filename, req.body.categoria], (err, rows, fields) => {
        console.log(req.body);
        if (err) {
            console.log(err);
            res.end('ERROR');
        } else {
            res.end('Agregaste');
        }
    });
});

//obtener usuarios
app.get('/api/users', function (req, res) {
    connection.query('SELECT * FROM users', (err, rows, fields) => {
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
            connection.query('INSERT INTO users VALUES (?, ?, ?, ?, null, null, null, null, 0, 0)', [req.body.username, hash, req.body.nombre, req.body.email], (err, rows, fields) => {
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
    connection.query('SELECT * FROM users WHERE username = ?', [req.body.username], function (err, result) {
        if (result.length === 0) {
            res.end('DATOS INVALIDOS1');
            console.log(req.body);
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