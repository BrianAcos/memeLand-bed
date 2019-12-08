const db = require('../services/db-connection');

const GET_MEMES = 'SELECT * FROM memes WHERE aprobacion = "si"';
const GET_MEME_ID = 'SELECT * FROM memes WHERE idmeme = ?';
const GET_MEME_CATEGORIA = 'SELECT * FROM memes WHERE (categoria LIKE ?) AND (aprobacion = "si")';
const GET_MEME_FAVORITO_BY_USER = 'SELECT * FROM  favoritos LEFT JOIN memes ON favoritos.idmeme = memes.idmeme WHERE (aprobacion = "si") AND (username = ?)'
const GET_MEME_NOAPROBADO = 'SELECT * FROM memes WHERE aprobacion is null';
const GET_MEME_REPROBADO = 'SELECT * FROM memes WHERE aprobacion = "no"';
const APROBAR_MEME = 'UPDATE memes SET aprobacion = ? WHERE idmeme = ?';
const SAVE_MEMES = 'INSERT INTO memes VALUES (0, ?, ?, ?, ?, ?, NOW(), null)';
const DELETE_MEME = 'DELETE FROM memes WHERE idmeme = ?';
const MODIFY_MEME = 'UPDATE memes SET titulo = ?, tags = ?, categoria = ? WHERE idmeme = ?';

class Memes {
    constructor(idmeme, creador, titulo, tags, foto, categoria, fecha, aprobacion) {
        this.idmeme = idmeme;
        this.creador = creador;
        this.titulo = titulo;
        this.tags = tags;
        this.foto = foto;
        this.categoria = categoria;
        this.fecha = fecha;
        this.aprobacion = aprobacion;
    }

    static getMemeById(ID) {
        return new Promise((resolve, reject) => {
            db.query(GET_MEME_ID, [ID], (error, result) => {
                if (error) {
                    reject(error)
                } else if (result[0] === undefined) {
                    resolve('404 not found')
                } else {
                    const meme = result[0];
                    const modelNewMeme = new Memes(meme.idmeme, meme.creador, meme.titulo, meme.tags, meme.foto, meme.categoria, meme.fecha, meme.aprobacion);
                    resolve(modelNewMeme);
                }
            });
        });
    }

    static getFavoritosByUser(username) {
        return new Promise((resolve, reject) => {
            db.query(GET_MEME_FAVORITO_BY_USER, [username], (error, results) => {
                if (error) {
                    reject(error)
                } else if (results[0] === undefined) {
                    resolve('404 not found')
                } else {
                    const memes = results.map((result) => {
                        const { idmeme, creador, titulo, tags, foto, categoria, fecha, aprobacion, } = result;
                        return new Memes(idmeme, creador, titulo, tags, foto, categoria, fecha, aprobacion)
                    });
                    resolve(memes)
                }
            });
        });
    }

    static getMemeByCategoria(categoria) {
        return new Promise((resolve, reject) => {
            db.query(GET_MEME_CATEGORIA, [categoria], (error, results) => {
                if (error) {
                    reject(error)
                } else if (results[0] === undefined) {
                    resolve('404 not found')
                } else {
                    const memes = results.map((result) => {
                        const { idmeme, creador, titulo, tags, foto, categoria, fecha, aprobacion, } = result;
                        return new Memes(idmeme, creador, titulo, tags, foto, categoria, fecha, aprobacion)
                    });
                    resolve(memes)
                }
            });
        });
    }

    static getMemeNoAprobado() {
        return new Promise((resolve, reject) => {
            db.query(GET_MEME_NOAPROBADO, (err, results) => {
                if (err) {
                    reject(err)
                } else if (results[0] === undefined) {
                    resolve('404 not found')
                }  else {
                    const memes = results.map((result) => {
                        const { idmeme, creador, titulo, tags, foto, categoria, fecha, aprobacion, } = result;
                        return new Memes(idmeme, creador, titulo, tags, foto, categoria, fecha, aprobacion)
                    });
                    resolve(memes)
                }
            });
        });
    }

    static aprobarMeme(aprobacion, id) {
        return new Promise((resolve, reject) => {
            db.query(APROBAR_MEME, [aprobacion, id], (err, result) =>  {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }


    static getAllMemes() {
        return new Promise((resolve, reject) => {
            db.query(GET_MEMES, (err, results) => {
                if (err) {
                    reject(err)
                } else if (results[0] === undefined) {
                    resolve('404 not found')
                }  else {
                    const memes = results.map((result) => {
                        const { idmeme, creador, titulo, tags, foto, categoria, fecha, aprobacion, } = result;
                        return new Memes(idmeme, creador, titulo, tags, foto, categoria, fecha, aprobacion)
                    });
                    resolve(memes)
                }
            });
        });
    }

    static deleteMemeById(ID) {
        return new Promise((resolve, reject) => {
            db.query(GET_MEME_ID, [ID], (error, result) => {
                if (error) {
                    reject(error)
                } else if (result[0] === undefined) {
                    resolve('404 not found')
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

    static convertJSON(string) {
        return JSON.stringify(string);
    }
}

module.exports = Memes;