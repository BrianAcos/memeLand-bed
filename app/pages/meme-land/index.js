const router = require('express').Router();
const React = require('react');
const { renderToString } = require('react-dom/server');
const Memes = require('../../../models/memes');
const View = require('./view');
const { StaticRouter } = require('react-router-dom');


router.get('/', (req, res, next) => {
  Memes.getAllMemes() //voy a el model memes y hago la req de pedir todos los memes
    .then(memesSinProcesar => {
      const memes = memesSinProcesar === '404 not found' ? [] : memesSinProcesar; //hago este proceso porque si no hay ningun meme se me cae la aplicacion
      const initialState = { //cargo las props en el inicialstate 
        memes,
        username: req.session.userId ? req.session.userId.username : '',  //el usuario de la session
        administrador: req.session.userId ? req.session.userId.administrador : '',
      };
      const context = {};
      // const content = renderToString(<View initialState={initialState}/>);  // COMO ESTABA ANTES
      const content = renderToString(
        <StaticRouter location={req.url} context={context} >
          <View initialState={initialState} />
        </StaticRouter>
      );

      res.render('template', {   //HACE USO DE EJS Y HACE EL DIBUJADO DEL TEMPLATE (CARPETA VIEWS TEMPLATE.EJS) Y LE PASA 4 PROPIEDADES PAGENAME, ETC 
        pageName: 'meme-land',
        pageTitle: 'Meme Land',
        initialState,
        content
      });
    })
    .catch(err => {
      next(err);
    });
});

router.get('/meme/:id', (req, res, next) => {
  Memes.getMemeById(req.params.id) //voy a el model memes y hago la req de pedir todos los memes
    .then(memesSinProcesar => {
      const memes = memesSinProcesar === '404 not found' ? [] : memesSinProcesar; //hago este proceso porque si no hay ningun meme se me cae la aplicacion
      const initialState = { //cargo las props en el inicialstate 
        memes,
        username: req.session.userId ? req.session.userId.username : '',  //el usuario de la session
        administrador: req.session.userId ? req.session.userId.administrador : '',
      };
      const context = {};
      // const content = renderToString(<View initialState={initialState}/>);  // COMO ESTABA ANTES
      const content = renderToString(
        <StaticRouter location={req.url} context={context} >
          <View initialState={initialState} />
        </StaticRouter>
      );

      res.render('template', {   //HACE USO DE EJS Y HACE EL DIBUJADO DEL TEMPLATE (CARPETA VIEWS TEMPLATE.EJS) Y LE PASA 4 PROPIEDADES PAGENAME, ETC 
        pageName: 'meme-land',
        pageTitle: 'Meme Land',
        initialState,
        content
      });
    })
    .catch(err => {
      next(err);
    });
});

router.get('/noaprobados', (req, res, next) => {
  if (req.session.userId.administrador !== 1) {
    res.send('SE NECESITA SER ADMINISTRADOR PARA APROBAR O REPROBAR MEMES PROBAR CON UPDATE users SET administrador = 1 WHERE username = ?');
  } else {
    Memes.getMemeNoAprobado()
      .then(memesSinProcesar => {
        const memes = memesSinProcesar === '404 not found' ? [] : memesSinProcesar;
        const initialState = {
          memes,
          username: req.session.userId ? req.session.userId.username : '',
        };
        const context = {};
        const content = renderToString(
          <StaticRouter location={req.url} context={context} >
            <View initialState={initialState} />
          </StaticRouter>
        );

        res.render('template', {
          pageName: 'meme-land',
          pageTitle: 'Meme Land',
          initialState,
          content
        });
      })
      .catch(err => {
        next(err);
      });
  }
});

router.get('/categorias/:categoria', (req, res, next) => {
  Memes.getMemeByCategoria(req.params.categoria)
    .then(memesSinProcesar => {
      const memes = memesSinProcesar === '404 not found' ? [] : memesSinProcesar;
      const initialState = {
        memes,
        username: req.session.userId ? req.session.userId.username : '',
      };
      const context = {};
      const content = renderToString(
        <StaticRouter location={req.url} context={context} >
          <View initialState={initialState} />
        </StaticRouter>
      );

      res.render('template', {
        pageName: 'meme-land',
        pageTitle: 'Meme Land',
        initialState,
        content
      });
    })
    .catch(err => {
      next(err);
    });
});

router.get('/tags/:tags', (req, res, next) => {
  Memes.getMemeByTag(req.params.tags)
    .then(memesSinProcesar => {
      const memes = memesSinProcesar === '404 not found' ? [] : memesSinProcesar;
      const initialState = {
        memes,
        username: req.session.userId ? req.session.userId.username : '',
      };
      const context = {};
      const content = renderToString(
        <StaticRouter location={req.url} context={context} >
          <View initialState={initialState} />
        </StaticRouter>
      );

      res.render('template', {
        pageName: 'meme-land',
        pageTitle: 'Meme Land',
        initialState,
        content
      });
    })
    .catch(err => {
      next(err);
    });
});

router.get('/favoritos/:user', (req, res, next) => {
  Memes.getFavoritosByUser(req.params.user)
    .then(memesSinProcesar => {
      const memes = memesSinProcesar === '404 not found' ? [] : memesSinProcesar;
      const initialState = {
        memes,
        username: req.session.userId ? req.session.userId.username : '',
      };
      const context = {};
      const content = renderToString(
        <StaticRouter location={req.url} context={context} >
          <View initialState={initialState} />
        </StaticRouter>
      );

      res.render('template', {
        pageName: 'meme-land',
        pageTitle: 'Meme Land',
        initialState,
        content
      });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;