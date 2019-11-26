const db = require('../services/db-connection');

const GET_FAVORITOS_BY_MEME = 'SELECT * FROM favoritos WHERE idmeme = ?';
const GET_FAVORITOS_BY_USERNAME = 'SELECT * FROM favoritos WHERE username = ?';
const SAVE_FAVORITO = 'INSERT INTO favoritos VALUES (?, ?)';
const DELETE_FAVORITO = 'DELETE FROM favoritos WHERE idmeme = ? AND username = ?';

class Favoritos {
    constructor(idmeme, username) {
        this.idmeme = idmeme;
        this.username = username;
    }

    //obtener todos los favoritos de ese usuario
    static getAllFavoritosByUser(username) {
        return new Promise((resolve, reject) => {
            db.query(GET_FAVORITOS_BY_USERNAME, [username], (err, results) => {
                if (err) {
                    reject(err)
                } else if (results[0] === undefined) {
                    resolve('No has guardado memes en favoritos')
                } else {
                    const favoritos = results.map((result) => {
                        const { idmeme, username } = result;
                        return new Favoritos(idmeme, username)
                    });
                    resolve(favoritos)
                }
            });
        });
    }

    //obtener todos los favoritos de ese meme
    static getAllFavoritosByMeme(idmeme) {
        return new Promise((resolve, reject) => {
            db.query(GET_FAVORITOS_BY_MEME, [idmeme], (err, results) => {
                if (err) {
                    reject(err)
                } else if (results[0] === undefined) {
                    resolve('No ha sido guardado por nadie')
                } else {
                    const favoritos = results.map((result) => {
                        const { idmeme, username } = result;
                        return new Favoritos(idmeme, username)
                    });
                    resolve(favoritos)
                }
            });
        });
    }

    //quitar un meme de favoritos segun un usuario
    static deleteFavoritoById(id, username) {
        return new Promise((resolve, reject) => {
            db.query(DELETE_FAVORITO, [id, username], (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            });
        });
    }

    //guardar un meme como favorito para un usuario
    save() {
        const { idmeme, username } = this;
        return new Promise((resolve, reject) => {
            db.query(SAVE_FAVORITO, [idmeme, username], (err, resp, fields) => {
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

module.exports = Favoritos;