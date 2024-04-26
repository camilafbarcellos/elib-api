const { getAutoresDB, addAutorDB, updateAutorDB, deleteAutorDB, getAutorPorCodigoDB } = require('../usecases/autorUseCases')

const getAutores = async (request, response) => {
    await getAutoresDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os autores: ' + err
        }));
}

const addAutor = async (request, response) => {
    await addAutorDB(request.body)
        .then(data => response.status(200).json({
            status: 'success', message: 'Autor criado',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateAutor = async (request, response) => {
    await updateAutorDB(request.body)
        .then(data => response.status(200).json({
            status: 'success', message: 'Autor alterado',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteAutor = async (request, response) => {
    await deleteAutorDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: 'success', message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const getAutorPorCodigo = async (request, response) => {
    await getAutorPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

module.exports = {
    getAutores, addAutor, updateAutor, deleteAutor, getAutorPorCodigo
}

