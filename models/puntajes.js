const db = require('../services/db-connection');

const GET_PUNTAJES_BY_MEME = 'SELECT * FROM puntajes WHERE idmeme = ?';
const GET_PUNTAJES_BY_USERNAME = 'SELECT * FROM puntajes WHERE username = ?';
const SAVE_PUNTAJE = 'INSERT INTO puntajes VALUES (?, ?, ?)';
const DELETE_PUNTAJE = 'DELETE FROM puntajes WHERE idmeme = ? AND username = ?';

class Puntajes {
    constructor(idmeme, username, puntaje) {
        this.idmeme = idmeme;
        this.username = username;
        this.puntaje = puntaje;
    }

    //obtener todos los puntos que ha dado ese usuario
    static getAllPuntajesByUser(username) {
        return new Promise((resolve, reject) => {
            db.query(GET_PUNTAJES_BY_USERNAME, [username], (err, results) => {
                if (err) {
                    reject(err)
                } else if (results[0] === undefined) {
                    resolve('No has puntuado aun')
                } else {
                    const puntajes = results.map((result) => {
                        const { idmeme, username, puntaje } = result;
                        return new Puntajes(idmeme, username, puntaje)
                    });
                    resolve(puntajes)
                }
            });
        });
    }

    //obtener todos los puntos de ese meme
    static getAllPuntajesByMeme(idmeme) {
        return new Promise((resolve, reject) => {
            db.query(GET_PUNTAJES_BY_MEME, [idmeme], (err, results) => {
                if (err) {
                    reject(err)
                } else if (results[0] === undefined) {
                    resolve('No ha sido comentado aun')
                } else {
                    const puntajes = results.map((result) => {
                        const { idmeme, username, puntaje } = result;
                        return new Puntajes(idmeme, username, puntaje)
                    });
                    resolve(puntajes)
                }
            });
        });
    }

    //quitar un puntaje segun un usuario
    static deletePuntajeById(id, username) {
        return new Promise((resolve, reject) => {
            db.query(DELETE_PUNTAJE, [id, username], (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(null)
                }
            });
        });
    }

    //guardar un puntaje hecho por un usuario
    save() {
        const { idmeme, username, puntaje } = this;
        return new Promise((resolve, reject) => {
            db.query(SAVE_PUNTAJE, [idmeme, username, puntaje], (err, resp, fields) => {
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

module.exports = Puntajes;