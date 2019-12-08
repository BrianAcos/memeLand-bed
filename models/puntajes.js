const db = require('../services/db-connection');

const GET_PUNTAJES_BY_MEME = 'SELECT sum(puntaje) puntos, count(puntaje) votos FROM puntajes where idmeme = ?';
const GET_PUNTAJES_BY_USERNAME = 'SELECT sum(puntaje) puntos, count(puntaje) votos FROM puntajes where username = ?';
const GET_PUNTAJES_BY_CREADOR = 'SELECT sum(puntaje) puntos, count(puntaje) votos FROM puntajes where creador = ?';
const SAVE_PUNTAJE = 'INSERT INTO puntajes VALUES (?, ?, ?, ?)';
const DELETE_PUNTAJE = 'DELETE FROM puntajes WHERE idmeme = ? AND username = ?';

class Puntajes {
    constructor(idmeme, username, puntaje, creador) {
        this.idmeme = idmeme;
        this.username = username;
        this.puntaje = puntaje;
        this.creador = creador;
    }

    //obtener todos los puntos que ha recibido ese usuario
    static getAllPuntajesByCreador(creador) {
        return new Promise((resolve, reject) => {
            db.query(GET_PUNTAJES_BY_CREADOR, [creador], (err, results) => {
                if (err) {
                    reject(err)
                } else if (results[0] === undefined) {
                    resolve('No has recibido puntos aun')
                } else {
                    const puntajes = results[0];
                    resolve(puntajes)
                }
            });
        });
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
                    const puntajes = results[0];
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
                    const puntajes = results[0];
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
        const { idmeme, username, puntaje, creador } = this;
        return new Promise((resolve, reject) => {
            db.query(SAVE_PUNTAJE, [idmeme, username, puntaje, creador], (err, resp, fields) => {
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