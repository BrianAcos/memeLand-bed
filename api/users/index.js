const router = require('express').Router();
const Users = require('../../models/users');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const express = require('express')
const app = express();

//numero para bcrypt
const saltRounds = 10;

//decirle a express que use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//configurar multer
const upload = multer({ dest: 'public/users/' });

//obtener un user
router.get('/:id', (req, res, next) => {
    Users.getUserById(req.params.id)
        .then((user) => {
            res.send(Users.convertJSON(user))
        })
        .catch((error) => {
            next(error)
        })
});

//todos los users
router.get('/', (req, res, next) => Users.getAllUsers()
    .then((users) => {
        res.send(users)
    })
    .catch((error) => {
        next(error)
    }));

// guardar user (nombre de usuario, contraseña, nombre, email, sexo, cumpleaños, avatar, sobremi)
router.post('/', upload.single('avatar'), (req, res, next) => {
    const username = req.body.username;
    const nombre = req.body.nombre;
    const email = req.body.email;
    const sexo = req.body.sexo;
    const birthday = req.body.birthday;
    const avatar = null;
    // const avatar = `users/${req.file.filename}`
    const sobreMi = req.body.sobremi
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            next(err)
        } else {
            const newUser = new Users(username, hash, nombre, email, sexo, birthday, avatar, sobreMi, 0, 0);
            newUser.save()
                .then((() => {
                    res.send(`Felicidades ${req.body.username} ya eres parte de MemeLand!`);
                }))
                .catch((error) => {
                    next(error)
                });
        }

    })

});

// borrar un user
router.delete('/:id', (req, res, next) => {
    Users.deleteUserById(req.params.id)
        .then(() => {
            res.send(`El usuario ${req.params.id} ha sido borrado`)
        })
        .catch((err) => {
            next(err)
        })
});

//modificar un user (sexo, cumpleaños, sobremi)
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const sexo = req.body.sexo;
    const birthday = req.body.birthday;
    const sobremi = req.body.sobremi;
    Users.modifyUserById(id, sexo, birthday, sobremi)
        .then(() => {
            res.send(`${id} modificaste tu sexo a ${sexo}, tu cumpleaños a ${birthday} y sobreti ${sobremi} `)
        })
        .catch((err) => {
            next(err)
        })
});




module.exports = router;