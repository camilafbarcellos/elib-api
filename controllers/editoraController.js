const { getEditorasDB, addEditoraDB, updateEditoraDB, deleteEditoraDB, getEditoraPorCodigoDB } = require('../usecases/editoraUseCases')

const getEditoras = async (request, response) => {
    await getEditorasDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as editoras: ' + err
        }));
}

const addEditora = async (request, response) => {
    await addEditoraDB(request.body)
        .then(data => response.status(200).json({
            status: 'success', message: 'Editora criada',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateEditora = async (request, response) => {
    await updateEditoraDB(request.body)
        .then(data => response.status(200).json({
            status: 'success', message: 'Editora alterada',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteEditora = async (request, response) => {
    await deleteEditoraDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: 'success', message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const getEditoraPorCodigo = async (request, response) => {
    await getEditoraPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

module.exports = {
    getEditoras, addEditora, updateEditora, deleteEditora, getEditoraPorCodigo
}

