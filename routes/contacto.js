var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function (req, res, next) {
    res.render('contacto', {
        IsContacto: true
    }) // contacto.hbs
});


router.post('/', async function (req, res, next) {
    var nombre = req.body.nombre;
    var email = req.body.email;
    var mensaje = req.body.comentarios;

    var obj = {
        to: 'carlosjherrera70@gmail.com',
        subject: 'Contacto desde el sitio web',
        html: nombre + 'quiero recibir mas info a este correo: ' + email + '. <br> y su mensaje es: ' + mensaje + ' .'
    }

    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST, 
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });//cierra transport

    var info = await transport.sendMail(obj);
    res.render('contacto', {
        message: 'Mensaje enviado correctamente',
        isContacto: true
        
    })




});

module.exports = router;