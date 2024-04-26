const { pool } = require('../config')
const Usuario = require('../entities/usuario')

const autenticaUsuarioDB = async (body) => {
    try {
        const { user, senha } = body;
        const isEmail = user.includes('@');
        let results;
        if (isEmail) {
            results = await pool.query(`SELECT * FROM usuarios WHERE email = $1 AND senha = $2`,
                [user, senha]);
        } else {
            results = await pool.query(`SELECT * FROM usuarios WHERE username = $1 AND senha = $2`,
                [user, senha]);
        }

        if (results.rowCount == 0) {
            throw 'Usuário ou senha inválidos';
        }

        const usuario = results.rows[0];

        return new Usuario(usuario.nome, usuario.username, usuario.email);
    } catch (err) {
        throw 'Erro ao autenticar o usuário: ' + err;
    }
}

module.exports = {
    autenticaUsuarioDB
}