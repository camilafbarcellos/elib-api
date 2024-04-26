const { Router } = require('express');

const { getEditoras, addEditora, updateEditora, deleteEditora, getEditoraPorCodigo } = require('../controllers/editoraController');

const { verificaJWT } = require('../controllers/segurancaController');

const rotasEditoras = new Router();

rotasEditoras.route('/editora')
   .get(getEditoras)
   .post(verificaJWT, addEditora)
   .put(verificaJWT, updateEditora)

rotasEditoras.route('/editora/:codigo')
   .get(verificaJWT, getEditoraPorCodigo)
   .delete(verificaJWT, deleteEditora)

module.exports = { rotasEditoras };