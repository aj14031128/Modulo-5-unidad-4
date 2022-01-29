var express = require('express');
var router = express.Router();
var novedadesModel = require ('../../Models/novedadesModel')

router.get('/', async function(req, res, next) {
  var novedades=await novedadesModel.getNovedades();
  res.render('admin/novedades', {
     layout:'admin/layout',
     usuario: req.session.nombre, //Punto 25 de mi resumen en papel (M5-U4). almaceno el valor de la columna nombre de la tabla, y lo voy a usar en novedades.hbs
    novedades
    });
});

router.get('/agregar', function(req, res, next) {
  res.render('admin/agregar', {
     layout:'admin/layout'
  })
})

//A traves del metodo post, vamos a recibir los datos que se cargan en la pagina de agregar

router.post ('/agregar', async (req,res,next)=>{
  console.log(req.body)
  try{
      if (req.body.titulo !="" && req.body.subtitulo != "" && req.body.cuerpo != ""){
        await novedadesModel.insertNovedad(req.body);
        res.redirect('/admin/novedades')
      } else{
        res.render('admin/agregar',{
          layout: 'admin/layout',
          error: true,   
        message:'Todos los campos son requeridos'
        })
      }
    } catch (error) {
        console.log (error)
        res.render('admin/agregar', {
          layout: 'admin/layout',
          error: true,   
        message:'No se cargo la novedad'
        })
    }
  })

module.exports = router;
