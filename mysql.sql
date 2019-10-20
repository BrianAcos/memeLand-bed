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

-- NO HACE FALTA SERIA DUPLICAR LAS FK
ALTER TABLE memeland.memescreados
ADD CONSTRAINT fk_memescreados3
FOREIGN KEY (idmeme)
REFERENCES memeland.memes(idmeme),
ADD CONSTRAINT fk_memescreados4
FOREIGN KEY (username)
REFERENCES memeland.users(username);

ALTER TABLE memeland.memesguardados
ADD CONSTRAINT fk_memesguardados3
FOREIGN KEY (idmeme)
REFERENCES memeland.memes(idmeme),
ADD CONSTRAINT fk_memesguardados4
FOREIGN KEY (username)
REFERENCES memeland.users(username);

ALTER TABLE memeland.memesaprobados
ADD CONSTRAINT fk_memesaprobados3
FOREIGN KEY (idmeme)
REFERENCES memeland.memes(idmeme),
ADD CONSTRAINT fk_memesaprobados4
FOREIGN KEY (username)
REFERENCES memeland.users(username);

-- agregar 
INSERT INTO memesaprobados VALUES (1, 'brian');
INSERT INTO memescreados VALUES (1, 'brian');
INSERT INTO memesguardados VALUES (1, 'brian');
INSERT INTO memes VALUES (1, 'titulodelmeme', 'descripcion del meme', 'C:\git\senpai-fed-project-app\public\memes\acertijos\meme-1.jpg', 'acertijos', 20191020235959, true, 0, 0, 0 );
INSERT INTO users VALUES ('brian', 'luisbrian', 'password', true, 19961210, 'algo sobre mi', 0, true);