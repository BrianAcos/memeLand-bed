const router = require('express').Router();
const Memes = require('../../models/memes');
const bodyParser = require('body-parser');
const multer = require('multer');
const express = require('express')
const app = express();

//decirle a express que use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//configurar multer
const upload = multer({ dest: 'dist/memes/' });



//obtener cantidad de memes subidos por ese usuario

//obtener memes en favoritos segun username
router.get('/favoritos/:username', (req, res, next) => {
    Memes.getFavoritosByUser(req.params.username)
        .then((meme) => {
            res.send(Memes.convertJSON(meme))
        })
        .catch((error) => {
            next(error);
        })
});

//obtener memes creados por ese user
router.get('/users/:username', (req, res, next) => {
    Memes.getMemeByUser(req.params.username)
        .then((meme) => {
            res.send(Memes.convertJSON(meme))
        })
        .catch((error) => {
            next(error);
        })
});

//obtener memes no aprobados
router.get('/aprobacion/null', (req, res, next) => {
    Memes.getMemeNoAprobado()
    .then((meme) => {
        res.send(Memes.convertJSON(meme))
    })
    .catch((error) => {
        next(error);
    })
});

//aprobar o reprobar meme
router.post('/aprobacion/null', (req, res, next) => {
    const aprobacion = req.body.aprobacion;
    const idmeme = req.body.idmeme;
    Memes.aprobarMeme(aprobacion, idmeme)
    .then(() => {
        res.send(null)
    })
    .catch((error) => {
        next(error);
    })
});

//obtener memes segun categoria
router.get('/categoria/:id', (req, res, next) => {
    Memes.getMemeByCategoria(req.params.id)
        .then((meme) => {
            res.send(Memes.convertJSON(meme))
        })
        .catch((error) => {
            next(error);
        })
});

//obtener 1 meme
router.get('/:id', (req, res, next) => {
    Memes.getMemeById(req.params.id)
        .then((meme) => {
            res.send(Memes.convertJSON(meme))
        })
        .catch((error) => {
            next(error);
        })
});

//obtener todos los memes
router.get('/', (req, res, next) => Memes.getAllMemes()
    .then(((memes) => {
        res.json(memes);
    }))
    .catch((err) => {
        next(err);
    })
);

// guardar memes (foto, nombre de usuario, tags, titulo, categoria)
router.post('/', upload.single('imagen'), (req, res, next) => {
    const user = req.body.username;
    const tags = req.body.tags;
    const titulo = req.body.titulo;
    const categoria = req.body.categoria;
    const imagen = `memes/${req.file.filename}`
    const newMeme = new Memes(0, user, titulo, tags, imagen, categoria, "NOW()", null, 0);
    newMeme.save()
        .then((() => {
            res.send(`${user} felicitaciones! has agregado un nevo meme`);
        }))
        .catch((err) => {
            next(err);
        })
});

// borrar un meme
router.delete('/:id', (req, res, next) => {
    Memes.deleteMemeById(req.params.id)
        .then(() => {
            res.send(`El meme ${req.params.id} ha sido borrado`)
        })
        .catch((err) => {
            next(err)
        })
});

//modificar un meme (solo se puede modificar el titulo, tags y categoria)
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const titulo = req.body.titulo;
    const tags = req.body.tags;
    const categoria = req.body.categoria;
    Memes.modifyMemeById(id, titulo, tags, categoria)
        .then(() => {
            res.send(`modificaste el meme ${id} con el titulo: ${titulo} tags: ${tags} categoria: ${categoria}`)
        })
        .catch((err) => {
            next(err)
        })
});

module.exports = router;