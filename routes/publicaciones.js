var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('publicaciones', { 
      IsPublicaciones: true 
    }); // publicaciones.hbs
});

module.exports = router;