const router = require('express').Router();
const Comentarios = require('../../models/comentarios');
const bodyParser = require('body-parser');
const express = require('express')
const app = express();

//decirle a express que use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//obtener todos los comentarios de ese usuario
router.get('/users/:username', (req, res, next) => {
    Comentarios.getAllComentariosByUser(req.params.username)
        .then((fav) => {
            res.send(Comentarios.convertJSON(fav))
        })
        .catch((error) => {
            next(error);
        })
});

//obtener todos comentarios de ese meme
router.get('/memes/:idmeme', (req, res, next) => {
    Comentarios.getAllComentariosByMeme(req.params.idmeme)
        .then((fav) => {
            res.send(Comentarios.convertJSON(fav))
        })
        .catch((error) => {
            next(error);
        })
});

// guardar comentario 
router.post('/', (req, res, next) => {
    const newComent = new Comentarios(req.body.idmeme, req.body.username, req.body.comentario);
    newComent.save()
        .then((() => {
            res.send(`${req.body.username} guardaste un comentario`);
        }))
        .catch((err) => {
            next(err);
        })
});

// borrar comentario
router.delete('/', (req, res, next) => {
    Comentarios.deleteComentarioById(req.body.idmeme, req.body.username, req.body.comentario)
        .then(() => {
            res.send(`${req.body.username} borraste un comentario`)
        })
        .catch((err) => {
            next(err)
        })
});

module.exports = router;