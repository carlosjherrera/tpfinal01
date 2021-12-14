var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModels');

router.get('/', async function(req,res,next){

var novedades = await novedadesModel.getNovedades();

    res.render('admin/novedades',{
        layout:'admin/layout',
        usuario:req.session.nombre,
        novedades
    });
});

router.get('/agregar', function(req,res,next){
    res.render('admin/agregar',{
        layout:'admin/layout'
    });
   
});/*--- */

router.post('/agregar', async (req, res, next) => {
    try {
        console.log(req.body);

        if(req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
            await novedadesModel.insertNovedad(req.body);
            res.redirect('/admin/novedades');
        }else{
            res.render('admin/agregar',{
                layout:'admin/layout',
                error:true,
                message: 'Todos los campos son requeridos'
            })
        }

    } catch (error) {
        console.log(error);
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargo la novedad'
        })
    }
})

/*eliminar*/

router.get('/eliminar/:id',async(req,res,next)=>{
    var id = req.params.id; //id 

    await novedadesModel.deleteNovedadByID(id);
    res.redirect('/admin/novedades');
}); 

router.get('/modificar/:id', async(req,res,next)=>{
    var id= req.params.id;
    var novedad = await novedadesModel.getNovedadesByID(id);
    res.render('admin/modificar',{
        layout:'admin/layout',
        novedad
    })
})

router.post('/modificar', async(req,res,next)=>{
    /* console.log(req.body) */
    try{
        var obj={
        titulo:req.body.titulo,
        subtitulo:req.body.subtitulo,
        cuerpo:req.body.cuerpo
    }
    await novedadesModel.modificarNovedadByID(obj,req.body.id);
    res.redirect('/admin/novedades');


    }catch (error){
        console.log(error);
        res.render('admin/modificar',{
            layout:'admin/layout',
            error:true,
            message: 'No se modificó la novedad'
        })
    }
})

module.exports = router;