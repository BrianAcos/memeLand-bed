const router = require('express').Router();
const React = require('react');
const { renderToString } = require('react-dom/server');
const Memes = require('../../../models/memes');
const View = require('./view');
const { StaticRouter } = require('react-router-dom');


router.get('/', (req, res, next) => {
  Memes.getAllMemes()
    .then(memes => {
      const initialState = {
        memes,
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