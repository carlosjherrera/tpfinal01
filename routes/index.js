var express = require('express');
//const async = require('hbs/lib/async');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { 
    isHome: true 
  });
}); //view/index.hbs


module.exports = router;
