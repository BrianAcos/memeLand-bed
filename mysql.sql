CREATE DATABASE
IF NOT EXISTS memeland;
USE memeland;

CREATE TABLE users(
    username VARCHAR(45) NOT NULL,
    password VARCHAR(200) NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    sexo VARCHAR(45) NULL,
    birthday DATE NULL,
    avatar VARCHAR(100) NULL,
    sobremi VARCHAR(500) NULL,
    administrador BOOLEAN DEFAULT false,
    PRIMARY KEY (username)
    );

CREATE TABLE memes(
    idmeme INTEGER NOT NULL AUTO_INCREMENT,
    creador VARCHAR(45) NOT NULL,
    titulo VARCHAR(200) NULL,
    tags VARCHAR (200) NULL,
    foto VARCHAR(150) NOT NULL,
    categoria VARCHAR(45) NOT NULL,
    fecha DATETIME,
    aprobacion VARCHAR(45) NULL,
    PRIMARY KEY (idmeme),
    CONSTRAINT fk_creador
    FOREIGN KEY (creador)
    REFERENCES memeland.users(username)
    ON DELETE CASCADE
    );

CREATE TABLE comentarios(
    idmeme INTEGER,
    username VARCHAR(45),
    comentario VARCHAR(400) NOT NULL,
    PRIMARY KEY (idmeme, username, comentario),
    CONSTRAINT fk_comentario_meme
    FOREIGN KEY (idmeme)
    REFERENCES memeland.memes(idmeme)
    ON DELETE CASCADE,
    CONSTRAINT fk_comentario_user
    FOREIGN KEY (username)
    REFERENCES memeland.users(username)
    ON DELETE CASCADE
    );

CREATE TABLE favoritos(
    idmeme INTEGER,
    username VARCHAR(45),
    PRIMARY KEY (idmeme, username),
    CONSTRAINT fk_favorito_meme
    FOREIGN KEY (idmeme)
    REFERENCES memeland.memes(idmeme)
    ON DELETE CASCADE,
    CONSTRAINT fk_favorito_user
    FOREIGN KEY (username)
    REFERENCES memeland.users(username)
    ON DELETE CASCADE
    );

CREATE TABLE puntajes(
    idmeme INTEGER,
    username VARCHAR(45),
    puntaje INTEGER NOT NULL,
    creador VARCHAR(45) NOT NULL,
    PRIMARY KEY (idmeme, username),
    CONSTRAINT fk_puntaje_meme
    FOREIGN KEY (idmeme)
    REFERENCES memeland.memes(idmeme)
    ON DELETE CASCADE,
    CONSTRAINT fk_puntaje_user
    FOREIGN KEY (username)
    REFERENCES memeland.users(username)
    ON DELETE CASCADE
    );