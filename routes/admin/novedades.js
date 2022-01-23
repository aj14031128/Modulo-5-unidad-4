var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin/novedades', {
     layout:'admin/layout',
     usuario: req.session.nombre //Punto 25 de mi resumen en papel. almaceno el valor de la columna nombre de la tabla, y lo voy a usar en novedades.hbs
    });
});


module.exports = router;
