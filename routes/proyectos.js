var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('proyectos', { 
      IsProyectos: true 
    }); // proyectos.hbs
});

module.exports = router;