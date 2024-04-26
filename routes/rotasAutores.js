const { Router } = require('express');

const { getAutores, addAutor, updateAutor, deleteAutor, getAutorPorCodigo } = require('../controllers/autorController');

const { verificaJWT } = require('../controllers/segurancaController');

const rotasAutores = new Router();

rotasAutores.route('/autor')
   .get(getAutores)
   .post(verificaJWT, addAutor)
   .put(verificaJWT, updateAutor)

rotasAutores.route('/autor/:codigo')
   .get(verificaJWT, getAutorPorCodigo)
   .delete(verificaJWT, deleteAutor)

module.exports = { rotasAutores };