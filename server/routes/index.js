const express = require('express');
const router = express.Router();

const homeCtrl = require('../controllers/homeCtrl');

module.exports = function () {

    router.get('/', homeCtrl.home);

    router.post('/enviar-correo', homeCtrl.enviarEmail);

    return router;
}