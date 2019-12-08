const router = require('express').Router();
const React = require('react');
const { renderToString } = require('react-dom/server');
const Users = require('../../../models/users');
const View = require('./view');
const { StaticRouter } = require('react-router-dom');


router.get('/:username', (req, res, next) => {
  Users.getUserById(req.params.username)
    .then(user => {
      const initialState = {
        user,
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