const router = require('express').Router();
const React = require('react');
const { renderToString } = require('react-dom/server');
const Memes = require('../../../models/memes');
const View = require('./view');
const { StaticRouter } = require('react-router-dom');


router.get('/', (req, res, next) => {
  Memes.getAllMemes()
    .then(memesSinProcesar => {
      const memes = memesSinProcesar === '404 not found' ? [] : memesSinProcesar;
      const initialState = {
        memes,
        username: req.session.userId ? req.session.userId.username : '',
      };
      const context = {};
      // const content = renderToString(<View initialState={initialState}/>);
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

router.get('/noaprobados', (req, res, next) => {
  if (req.session.userId.username !== 'Brian') {
    res.send('SE NECESITA SER ADMINISTRADOR PARA APROBAR O REPROBAR MEMES');
  } else {
    Memes.getMemeNoAprobado()
      .then(memesSinProcesar => {
        const memes = memesSinProcesar === '404 not found' ? [] : memesSinProcesar;
        const initialState = {
          memes,
          username: req.session.userId ? req.session.userId.username : '',
        };
        const context = {};
        // const content = renderToString(<View initialState={initialState}/>);
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

router.get('/:categoria', (req, res, next) => {
  Memes.getMemeByCategoria(req.params.categoria)
    .then(memesSinProcesar => {
      const memes = memesSinProcesar === '404 not found' ? [] : memesSinProcesar;
      const initialState = {
        memes,
        username: req.session.userId ? req.session.userId.username : '',
      };
      const context = {};
      // const content = renderToString(<View initialState={initialState}/>);
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
      // const content = renderToString(<View initialState={initialState}/>);
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