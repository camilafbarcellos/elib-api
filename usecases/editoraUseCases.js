const { pool } = require('../config');
const Editora = require('../entities/editora')

const getEditorasDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM editoras ORDER BY codigo');
        return rows.map((editora) => new Editora(editora.codigo, editora.nome));        
    } catch (err) {
        throw 'Erro : ' + err;
    }
}

const addEditoraDB = async (body) => {
    try {   
        const { nome } = body; 
        const results = await pool.query(`INSERT INTO editoras (nome) 
            VALUES ($1)
            returning codigo, nome`,
        [nome]);
        const editora = results.rows[0];
        return new Editora(editora.codigo, editora.nome); 
    } catch (err) {
        throw 'Erro ao inserir a editora: ' + err;
    }    
}


const updateEditoraDB = async (body) => {
    try {   
        const { codigo, nome }  = body; 
        const results = await pool.query(`UPDATE editoras set nome = $2 where codigo = $1 
        returning codigo, nome`,
        [codigo, nome]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const editora = results.rows[0];
        return new Editora(editora.codigo, editora.nome); 
    } catch (err) {
        throw 'Erro ao alterar a editora: ' + err;
    }      
}

const deleteEditoraDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM editoras where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return 'Editora removida com sucesso';
        }       
    } catch (err) {
        throw 'Erro ao remover a editora: ' + err;
    }     
}

const getEditoraPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM editoras where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw 'Nenhum registro encontrado com o código: ' + codigo;
        } else {
            const editora = results.rows[0];
            return new Editora(editora.codigo, editora.nome); 
        }       
    } catch (err) {
        throw 'Erro ao recuperar a editora: ' + err;
    }     
}

module.exports = {
    getEditorasDB, addEditoraDB, updateEditoraDB, deleteEditoraDB, getEditoraPorCodigoDB
}
