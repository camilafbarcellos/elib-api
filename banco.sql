CREATE TABLE editoras (
    codigo SERIAL PRIMARY KEY,
    nome TEXT NOT NULL
);

CREATE TABLE autores (
    codigo SERIAL PRIMARY KEY,
    nome TEXT NOT NULL
);

CREATE TABLE livros (
    codigo SERIAL PRIMARY KEY,
    titulo TEXT NOT NULL,
    data_cadastro DATE NOT NULL,
    autor INTEGER NOT NULL,
    editora INTEGER NOT NULL,
	ano INTEGER NOT NULL,
    FOREIGN KEY (autor) REFERENCES autores (codigo),
    FOREIGN KEY (editora) REFERENCES editoras (codigo)
);

-- inserindo registros
-- editoras
INSERT INTO editoras (nome) VALUES
	('Intrínseca'),
	('Rocco'),
	('Paralela'),
	('Suma');

-- autores
INSERT INTO autores (nome) VALUES
	('Rick Riordan'),
	('J.K. Rowling'),
	('Taylor Jenkins Reid'),
	('George R.R. Martin');

-- livros
INSERT INTO livros (titulo, data_cadastro, autor, editora, ano) VALUES
	('O Ladrão de Raios - Percy Jackson e os Olimpianos', '2024-04-26', 1, 1, 2014),
	('Harry Potter e a Pedra Filosofal', '2024-04-26', 2, 2, 2000),
	('Os Sete Maridos de Evelyn Hugo', '2024-04-26', 3, 3, 2019),
	('A Guerra dos Tronos: As Crônicas de Gelo e Fogo', '2024-04-26', 4, 4, 1996);

-- criação da tabela usuários
CREATE TABLE usuarios (
    codigo SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
);

-- inserindo um usuário
INSERT INTO usuarios (nome, username, email, senha)
VALUES ('Camila Barcellos', 'camilabarcellos', 'camilabarcellos@gmail.com', '123456');

