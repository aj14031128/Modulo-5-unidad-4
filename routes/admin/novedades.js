var express = require('express');
const pool = require('../../Models/bd');
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


  //eliminar novedad

  router.get('/eliminar/:id', async(req,res,next)=>{
    var id = req.params.id;
    await novedadesModel.deleteNovedadesById(id);
    res.redirect('/admin/novedades');
  });

  //modificar formulario y traer los datos de una sola novedad

  router.get('/modificar/:id', async(req,res,next)=>{
    var id = req.params.id;
    console.log(req.params.id);
    var novedad= await novedadesModel.getNovedadesById(id);
    console.log(req.params.id);
res.render('admin/modificar',{
  layout: 'admin/layout',
  novedad
})
  });

  router.post('/modificar', async(req,res,next)=>{
    try{
      var obj={
        titulo:req.body.titulo,
        subtitulo:req.body.subtitulo,
        cuerpo:req.body.cuerpo
      }
      console.log(obj)
      console.log(req.body.id)
      await novedadesModel.modificarNovedadesById(obj, req.body.id);
      res.redirect('/admin/novedades');
    } catch(error){
      console.log(error)
      res.render('admin/modificar',{
        layout:'admin/layout',
        error:true,
        message:'No se modifico la novedad'
      })
    }
  })


module.exports = router;
