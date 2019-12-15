const router = require('express').Router();
const React = require('react');
const { renderToString } = require('react-dom/server');
const Memes = require('../../../models/memes');

const Users = require('../../../models/users');
const View = require('./view');
const { StaticRouter } = require('react-router-dom');


router.get('/:username', (req, res, next) => {  //hago las dos promesas. busco el usuario y busco los memes que subio
  const promiseMemes = Memes.getMemeByUser(req.params.username);
  const promiseUsers = Users.getUserById(req.params.username);
  Promise.all([promiseMemes, promiseUsers])
    .then(useryMemes => {
      const user = useryMemes[1];
      const memes = useryMemes[0];
      const initialState = {
        user,
        memes,
        username: req.session.userId ? req.session.userId.username: null,
        administrador: req.session.userId ? req.session.userId.admin : '',
      };
      
      const context = {};
      const content = renderToString(
        <StaticRouter location={req.url} context={context} >
          <View initialState={initialState} />
        </StaticRouter>
      );

      res.render('template', {
        pageName: 'perfil',
        pageTitle: `Perfil de ${req.params.username}`,
        initialState,
        content
      });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;