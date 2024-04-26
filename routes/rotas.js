const { Router } = require('express');

const { getBemVindo } = require('../controllers/comumController')
const { login } = require('../controllers/segurancaController')
const { rotasEditoras } = require('./rotasEditoras');
const { rotasAutores } = require('./rotasAutores');
const { rotasLivros } = require('./rotasLivros');

const rotas = new Router();

rotas.route('/')
   .get(getBemVindo)

rotas.route('/login')
   .post(login)

rotas.use(rotasEditoras);
rotas.use(rotasAutores);
rotas.use(rotasLivros);

module.exports = rotas;