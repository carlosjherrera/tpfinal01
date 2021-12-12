var express = require('express');
const session = require('express-session');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModels');

router.get('/', function (req, res, next) {
  res.render('admin/login', {
    layout: 'admin/layout'
  }) // admin.hbs
});

router.post('/', async function (req, res, next) {
  try {

    var usuario = req.body.usuario;
    var password = req.body.password;

    var data = await usuariosModel.getUserAndPassword(usuario,password);

    if (data != undefined) {
      req.session.id_usuario = data.id; // 1
      req.session.nombre = data.usuario; // Carlos

      res.redirect('/admin/novedades');
    } else {
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true

      })
    }

  } catch (error) {
    console.log(error);
  }
});


module.exports = router;