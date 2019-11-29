const router = require('express').Router();
const Puntajes = require('../../models/puntajes');
const bodyParser = require('body-parser');
const express = require('express')
const app = express();

//decirle a express que use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//obtener todos los puntos que recibio ese usuario
router.get('/creador/:username', (req, res, next) => {
    Puntajes.getAllPuntajesByCreador(req.params.username)
        .then((respuesta) => {
            res.send(Puntajes.convertJSON(respuesta))
        })
        .catch((error) => {
            next(error);
        })
});

//obtener todos los puntos que dio ese usuario
router.get('/users/:username', (req, res, next) => {
    Puntajes.getAllPuntajesByUser(req.params.username)
        .then((fav) => {
            res.send(Puntajes.convertJSON(fav))
        })
        .catch((error) => {
            next(error);
        })
});

//obtener todos puntos de ese meme
router.get('/memes/:idmeme', (req, res, next) => {
    Puntajes.getAllPuntajesByMeme(req.params.idmeme)
        .then((fav) => {
            res.send(Puntajes.convertJSON(fav))
        })
        .catch((error) => {
            next(error);
        })
});

// guardar puntaje 
router.post('/', (req, res, next) => {
    const newComent = new Puntajes(req.body.idmeme, req.body.username, req.body.puntaje, req.body.creador);
    newComent.save()
        .then((() => {
            res.send(`${req.body.username} diste una puntuacion`);
        }))
        .catch((err) => {
            res.send('error')
            console.log(req.body.idmeme, req.body.username, req.body.puntaje, req.body.creador);
            
        })
});

// borrar puntaje
router.delete('/', (req, res, next) => {
    Puntajes.deletePuntajeById(req.body.idmeme, req.body.username)
        .then(() => {
            res.send(`${req.body.username} borraste una puntuacion`)
        })
        .catch((err) => {
            next(err)
        })
});

module.exports = router;