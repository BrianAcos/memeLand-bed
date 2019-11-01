CREATE DATABASE
IF NOT EXISTS memeland;
USE memeland;

CREATE TABLE users(
    username VARCHAR(45) NOT NULL,
    password VARCHAR(200) NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    email VARCHAR(100) NOT NULL,
    sexo BOOLEAN NULL,
    edad DATE NULL,
    avatar VARCHAR(100) NULL,
    sobremi VARCHAR(500) NULL,
    puntaje INTEGER DEFAULT 0,
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
    aprobacion BOOLEAN DEFAULT false,
    votos INTEGER DEFAULT 0,
    puntaje INTEGER DEFAULT 0,
    promedio INTEGER DEFAULT 0,
    PRIMARY KEY (idmeme),
    CONSTRAINT fk_creador
    FOREIGN KEY (creador)
    REFERENCES memeland.users(username)
    );

CREATE TABLE comentarios(
    comentario VARCHAR(200) NOT NULL, 
    idmeme INTEGER AUTO_INCREMENT,
    username VARCHAR(45),
    PRIMARY KEY (idmeme, username),
    CONSTRAINT fk_comentario_meme
    FOREIGN KEY (idmeme)
    REFERENCES memeland.memes(idmeme),
    CONSTRAINT fk_comentario_user
    FOREIGN KEY (username)
    REFERENCES memeland.users(username)
    );

CREATE TABLE guardados(
    idmeme INTEGER AUTO_INCREMENT,
    username VARCHAR(45),
    PRIMARY KEY (idmeme, username),
    CONSTRAINT fk_guardado_meme
    FOREIGN KEY (idmeme)
    REFERENCES memeland.memes(idmeme),
    CONSTRAINT fk_guardado_user
    FOREIGN KEY (username)
    REFERENCES memeland.users(username)
    );

CREATE TABLE aprobados(
    idmeme INTEGER AUTO_INCREMENT,
    username VARCHAR(45),
    PRIMARY KEY (idmeme, username),
    CONSTRAINT fk_aprobado_meme
    FOREIGN KEY (idmeme)
    REFERENCES memeland.memes(idmeme),
    CONSTRAINT fk_aprobado_user
    FOREIGN KEY (username)
    REFERENCES memeland.users(username)
    );