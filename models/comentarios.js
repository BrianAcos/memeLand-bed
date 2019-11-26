const db = require('../services/db-connection');

const GET_COMENTARIOS_BY_MEME = 'SELECT * FROM comentarios WHERE idmeme = ?';
const GET_COMENTARIOS_BY_USERNAME = 'SELECT * FROM comentarios WHERE username = ?';
const SAVE_COMENTARIO = 'INSERT INTO comentarios VALUES (?, ?, ?)';
const DELETE_COMENTARIO = 'DELETE FROM comentarios WHERE idmeme = ? AND username = ? AND comentario = ?';

class Comentarios {
    constructor(idmeme, username, comentario) {
        this.idmeme = idmeme;
        this.username = username;
        this.comentario = comentario;
    }

    //obtener todos los comentarios de ese usuario
    static getAllComentariosByUser(username) {
        return new Promise((resolve, reject) => {
            db.query(GET_COMENTARIOS_BY_USERNAME, [username], (err, results) => {
                if (err) {
                    reject(err)
                } else if (results[0] === undefined) {
                    resolve('No has hecho ningun comentario')
                } else {
                    const comentarios = results.map((result) => {
                        const { idmeme, username, comentario } = result;
                        return new Comentarios(idmeme, username, comentario)
                    });
                    resolve(comentarios)
                }
            });
        });
    }

    //obtener todos los comentarios de ese meme
    static getAllComentariosByMeme(idmeme) {
        return new Promise((resolve, reject) => {
            db.query(GET_COMENTARIOS_BY_MEME, [idmeme], (err, results) => {
                if (err) {
                    reject(err)
                } else if (results[0] === undefined) {
                    resolve('No ha sido comentado aun')
                } else {
                    const comentarios = results.map((result) => {
                        const { idmeme, username, comentario } = result;
                        return new Comentarios(idmeme, username, comentario)
                    });
                    resolve(comentarios)
                }
            });
        });
    }

    //quitar un comentario segun un usuario
    static deleteComentarioById(id, username, comentario) {
        return new Promise((resolve, reject) => {
            db.query(DELETE_COMENTARIO, [id, username, comentario], (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(null)
                }
            });
        });
    }

    //guardar un comentario hecho por un usuario
    save() {
        const { idmeme, username, comentario } = this;
        return new Promise((resolve, reject) => {
            db.query(SAVE_COMENTARIO, [idmeme, username, comentario], (err, resp, fields) => {
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

module.exports = Comentarios;