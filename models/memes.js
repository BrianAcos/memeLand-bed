const db = require('../services/db-connection');

const GET_MEMES = 'SELECT * FROM memes';
const GET_MEME_ID = 'SELECT * FROM memes WHERE idmeme = ?';
const SAVE_MEMES = 'INSERT INTO memes VALUES (0, ?, ?, ?, ?, ?, NOW(), null, 0, 0)';
const DELETE_MEME = 'DELETE FROM memes WHERE idmeme = ?';
const MODIFY_MEME = 'UPDATE memes SET titulo = ?, tags = ?, categoria = ? WHERE idmeme = ?';

class Memes {
    constructor(idmeme, creador, titulo, tags, foto, categoria, fecha, aprobacion, votos, puntaje) {
        this.idmeme = idmeme;
        this.creador = creador;
        this.titulo = titulo;
        this.tags = tags;
        this.foto = foto;
        this.categoria = categoria;
        this.fecha = fecha;
        this.aprobacion = aprobacion;
        this.votos = votos;
        this.puntaje = puntaje;
    }

    static getMemeById(ID) {
        return new Promise((resolve, reject) => {
            db.query(GET_MEME_ID, [ID], (error, result) => {
                if (error || result[0] === undefined) {
                    reject(error)
                } else {
                    const meme = result[0];
                    const modelNewMeme = new Memes(meme.idmeme, meme.creador, meme.titulo, meme.tags, meme.foto, meme.categoria, meme.fecha, meme.aprobacion, meme.votos, meme.puntaje);
                    resolve(modelNewMeme);
                }
            });
        });
    }


    static getAllMemes() {
        return new Promise((resolve, reject) => {
            db.query(GET_MEMES, (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    const memes = results.map((result) => {
                        const { idmeme, creador, titulo, tags, foto, categoria, fecha, aprobacion, votos, puntaje } = result;
                        return new Memes(idmeme, creador, titulo, tags, foto, categoria, fecha, aprobacion, votos, puntaje)
                    });
                    resolve(memes)
                }
            });
        });
    }

    static deleteMemeById(ID) {
        return new Promise((resolve, reject) => {
            db.query(GET_MEME_ID, [ID], (error, result) => {
                if (error || result[0] === undefined) {
                    reject(error)
                } else {
                    db.query(DELETE_MEME, [ID], (err, result) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve()
                        }
                    })
                }
            });
        });
    }

    static modifyMemeById(id, titulo, tags, categoria) {
        return new Promise((resolve, reject) => {
            db.query(MODIFY_MEME, [titulo, tags, categoria, id], (err, result) =>  {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    save() {
        const { creador, titulo, tags, foto, categoria } = this;
        return new Promise((resolve, reject) => {
            db.query(SAVE_MEMES, [creador, titulo, tags, foto, categoria], (err, resp, fields) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            });
        });
    }

    convertJSON() {
        const jsonUser = {
            idmeme: this.idmeme,
            creador: this.creador,
            titulo: this.titulo,
            tags: this.tags,
            foto: this.foto,
            categoria: this.categoria,
            fecha: this.fecha,
            aprobacion: this.aprobacion,
            votos: this.votos,
            puntaje: this.puntaje,
        };
        return JSON.stringify(jsonUser);
    }
}

module.exports = Memes;