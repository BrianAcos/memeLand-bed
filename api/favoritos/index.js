const router = require('express').Router();
const Favoritos = require('../../models/favoritos');
const bodyParser = require('body-parser');
const express = require('express')
const app = express();

//decirle a express que use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//obtener todos los memes guardados de ese usuario
router.get('/users/:username', (req, res, next) => {
    Favoritos.getAllFavoritosByUser(req.params.username)
        .then((fav) => {
            res.send(Favoritos.convertJSON(fav))
        })
        .catch((error) => {
            next(error);
        })
});

//obtener todos los usuarios que guardaron ese meme
router.get('/memes/:idmeme', (req, res, next) => {
    Favoritos.getAllFavoritosByMeme(req.params.idmeme)
        .then((fav) => {
            res.send(Favoritos.convertJSON(fav))
        })
        .catch((error) => {
            next(error);
        })
});

// guardar meme en favoritos
router.post('/', (req, res, next) => {
    const newFav = new Favoritos(req.body.idmeme, req.body.username);
    newFav.save()
        .then((() => {
            res.send(`${req.body.username} felicitaciones! has agregado un nevo meme a favoritos`);
        }))
        .catch((err) => {
            next(err);
        })
});

// borrar un meme en favoritos
router.delete('/', (req, res, next) => {
    Favoritos.deleteFavoritoById(req.body.idmeme, req.body.username)
        .then(() => {
            res.send(`El meme ${req.body.idmeme} se quito de favorios`)
        })
        .catch((err) => {
            next(err)
        })
});

module.exports = router;