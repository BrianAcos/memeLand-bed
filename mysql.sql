CREATE DATABASE
IF NOT EXISTS memeland;
USE memeland;

CREATE TABLE memescreados(
    idmeme INTEGER,
    username VARCHAR(45),
    PRIMARY KEY (idmeme, username),
    KEY index_user (username)
    );

CREATE TABLE memesguardados(
    idmeme INTEGER,
    username VARCHAR(45),
    PRIMARY KEY (idmeme, username),
    KEY index_user (username)
    );

CREATE TABLE memesaprobados(
    idmeme INTEGER,
    username VARCHAR(45),
    PRIMARY KEY (idmeme, username),
    KEY index_user (username)
    );

CREATE TABLE memes(
    idmeme INTEGER NOT NULL,
    titulo VARCHAR(200) NULL,
    descripcion VARCHAR(500) NULL,
    foto VARCHAR(150) NOT NULL,
    categoria VARCHAR(45) NOT NULL,
    fecha DATETIME,
    aprobacion BOOLEAN DEFAULT false,
    votos INTEGER DEFAULT 0,
    puntaje INTEGER DEFAULT 0,
    promedio INTEGER DEFAULT 0,
    PRIMARY KEY (idmeme),
    CONSTRAINT fk_memescreados
    FOREIGN KEY (idmeme)
    REFERENCES memeland.memescreados(idmeme),
    CONSTRAINT fk_memesguardados
    FOREIGN KEY (idmeme)
    REFERENCES memeland.memesguardados(idmeme),
    CONSTRAINT fk_memesaprobados
    FOREIGN KEY (idmeme)
    REFERENCES memeland.memesaprobados(idmeme)
    );

CREATE TABLE users(
    username VARCHAR(45) NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    contraseña VARCHAR(45) NOT NULL,
    sexo BOOLEAN NOT NULL,
    edad DATE NOT NULL,
    sobremi VARCHAR(500) NULL,
    puntaje INTEGER DEFAULT 0,
    administrador BOOLEAN DEFAULT false,
    PRIMARY KEY (username),
    CONSTRAINT fk_memescreados2
    FOREIGN KEY (username)
    REFERENCES memeland.memescreados(username),
    CONSTRAINT fk_memesguardados2
    FOREIGN KEY (username)
    REFERENCES memeland.memesguardados(username),
    CONSTRAINT fk_memesaprobados2
    FOREIGN KEY (username)
    REFERENCES memeland.memesaprobados(username)
    );