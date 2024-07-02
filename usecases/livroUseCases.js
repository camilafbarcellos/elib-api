const { pool } = require('../config');
const Livro = require('../entities/livro');

const getLivrosDB = async () => {
    try {
        const { rows } = await pool.query(`
            SELECT p.codigo, p.titulo, to_char(p.data_cadastro,'YYYY-MM-DD') as data_cadastro, p.autor, a.nome AS autor_nome,
                   p.editora, e.nome AS editora_nome, p.ano
            FROM livros p
            JOIN autores a ON p.autor = a.codigo
            JOIN editoras e ON p.editora = e.codigo
            ORDER BY p.codigo
        `);
        return rows.map((livro) => new Livro(
            livro.codigo,
            livro.titulo,
            livro.data_cadastro,
            livro.autor,
            livro.autor_nome,
            livro.editora,
            livro.editora_nome,
            livro.ano
        ));
    } catch (err) {
        throw 'Erro : ' + err;
    }
}

const addLivroDB = async (body) => {
    try {
        const { titulo, autor, editora, ano } = body;
        const results = await pool.query(`
            INSERT INTO livros (titulo, data_cadastro, autor, editora, ano) 
            VALUES ($1, CURRENT_DATE, $2, $3, $4)
            RETURNING codigo, titulo, to_char(data_cadastro,'YYYY-MM-DD') as data_cadastro, autor, editora, ano
        `, [titulo, autor, editora, ano]);
        const livro = results.rows[0];
        return new Livro(
            livro.codigo,
            livro.titulo,
            livro.data_cadastro,
            livro.autor,
            '',
            livro.editora,
            '',
            livro.ano
        );
    } catch (err) {
        throw 'Erro ao inserir o livro: ' + err;
    }
}

const updateLivroDB = async (body) => {
    try {
        const { codigo, titulo, data_cadastro, autor, editora, ano } = body;
        const results = await pool.query(`
            UPDATE livros 
            SET titulo = $2, data_cadastro = $3, autor = $4, editora = $5, ano = $6
            WHERE codigo = $1 
            RETURNING codigo, titulo, to_char(data_cadastro,'YYYY-MM-DD') as data_cadastro, autor, editora, ano
        `, [codigo, titulo, data_cadastro, autor, editora, ano]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const livro = results.rows[0];
        return new Livro(
            livro.codigo,
            livro.titulo,
            livro.data_cadastro,
            livro.autor,
            '',
            livro.editora,
            '',
            livro.ano
        );
    } catch (err) {
        throw 'Erro ao alterar o livro: ' + err;
    }
}

const deleteLivroDB = async (codigo) => {
    try {
        const results = await pool.query(`
            DELETE FROM livros 
            WHERE codigo = $1
            RETURNING codigo
        `, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removcodigoo`;
        } else {
            return 'Livro removcodigoo com sucesso';
        }
    } catch (err) {
        throw 'Erro ao remover o livro: ' + err;
    }
}

const getLivroPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`
            SELECT p.codigo, p.titulo, to_char(data_cadastro,'YYYY-MM-DD'), p.autor, a.nome AS autor_nome,
                   p.editora, e.nome AS editora_nome, p.ano
            FROM livros p
            JOIN autores a ON p.autor = a.codigo
            JOIN editoras e ON p.editora = e.codigo 
            WHERE p.codigo = $1
        `, [codigo]);
        if (results.rowCount == 0) {
            throw 'Nenhum registro encontrado com o código: ' + codigo;
        } else {
            const livro = results.rows[0];
            return new Livro(
                livro.codigo,
                livro.titulo,
                livro.data_cadastro,
                livro.autor,
                livro.autor_nome,
                livro.editora,
                livro.editora_nome,
                livro.ano
            );
        }
    } catch (err) {
        throw 'Erro ao recuperar o livro: ' + err;
    }
}

module.exports = {
    getLivrosDB, addLivroDB, updateLivroDB, deleteLivroDB, getLivroPorCodigoDB
}