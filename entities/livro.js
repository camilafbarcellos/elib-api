class Livro {
    constructor(codigo, titulo, data_cadastro, autor, autor_nome, editora, editora_nome, ano) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.data_cadastro = data_cadastro;
        this.autor = autor;
        this.autor_nome = autor_nome;
        this.editora = editora;
        this.editora_nome = editora_nome;
        this.ano = ano;
    }
}

module.exports = Livro;