const { pool } = require('../config');
const Autor = require('../entities/autor')

const getAutoresDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM autores ORDER BY nome');
        return rows.map((autor) => new Autor(autor.codigo, autor.nome));        
    } catch (err) {
        throw 'Erro : ' + err;
    }
}

const addAutorDB = async (body) => {
    try {   
        const { nome } = body; 
        const results = await pool.query(`INSERT INTO autores (nome) 
            VALUES ($1)
            returning codigo, nome`,
        [nome]);
        const autor = results.rows[0];
        return new Autor(autor.codigo, autor.nome); 
    } catch (err) {
        throw 'Erro ao inserir o autor: ' + err;
    }    
}


const updateAutorDB = async (body) => {
    try {   
        const { codigo, nome }  = body; 
        const results = await pool.query(`UPDATE autores set nome = $2 where codigo = $1 
        returning codigo, nome`,
        [codigo, nome]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const autor = results.rows[0];
        return new Autor(autor.codigo, autor.nome); 
    } catch (err) {
        throw 'Erro ao alterar o autor: ' + err;
    }      
}

const deleteAutorDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM autores where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return 'Autor removido com sucesso';
        }       
    } catch (err) {
        throw 'Erro ao remover o autor: ' + err;
    }     
}

const getAutorPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM autores where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw 'Nenhum registro encontrado com o código: ' + codigo;
        } else {
            const autor = results.rows[0];
            return new Autor(autor.codigo, autor.nome); 
        }       
    } catch (err) {
        throw 'Erro ao recuperar o autor: ' + err;
    }     
}

module.exports = {
    getAutoresDB, addAutorDB, updateAutorDB, deleteAutorDB, getAutorPorCodigoDB
}
