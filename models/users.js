const db = require('../services/db-connection');

const GET_USERS = 'SELECT * FROM users';
const GET_USER_ID = 'SELECT * FROM users WHERE username = ?';
const SAVE_USERS = 'INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 0)';
const DELETE_USER = 'DELETE FROM users WHERE username = ?';
const MODIFY_USER = 'UPDATE users SET sexo = ?, birthday = ?, sobremi = ? WHERE username = ?';

class Users {
    constructor(username, password, nombre, mail, sexo, birthday, avatar, sobremi, puntaje, administrador) {
        this.username = username;
        this.password = password;
        this.nombre = nombre;
        this.mail = mail;
        this.sexo = sexo;
        this.birthday = birthday;
        this.avatar = avatar;
        this.sobremi = sobremi;
        this.puntaje = puntaje;
        this.administrador = administrador;
    }

    static getUserById(ID) {
        return new Promise((resolve, reject) => {
            db.query(GET_USER_ID, [ID], (err, result) => {
                if (err) {
                    reject(err);
                } else if (result[0] === undefined) {
                    resolve('404 not found')
                } else {
                    const user = result[0];
                    const modelUser = new Users(user.username, user.password, user.nombre, user.mail, user.sexo, user.birthday, user.avatar, user.sobremi, user.puntaje, user.administrador);
                    resolve(modelUser); 
                }
            });
        });
    }

    static getAllUsers() {
        return new Promise((resolve, reject) => {
            db.query(GET_USERS, (err, results) => {
                if(err) {
                    reject(err)
                } else {
                    const users = results.map((result) => {
                        const { username, password, nombre, mail, sexo, birthday, avatar, sobremi, puntaje, administrador } = result;
                        return new Users(username, password, nombre, mail, sexo, birthday, avatar, sobremi, puntaje, administrador)
                     });
                     resolve(users)
                }
            });
        });
    }

    static deleteUserById(ID) {
        return new Promise((resolve, reject) => {
            db.query(GET_USER_ID, [ID], (error, result) => {
                if (error) {
                    reject(error)
                } else if (result[0] === undefined) {
                    resolve('404 not found')
                } else {
                    db.query(DELETE_USER, [ID], (err, result) => {
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

    static modifyUserById(id, sexo, birthday, sobremi) {
        return new Promise((resolve, reject) => {
            db.query(MODIFY_USER, [sexo, birthday, sobremi, id], (err, result) =>  {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    save() {
        const { username, password, nombre, mail, sexo, birthday, avatar, sobremi, puntaje, administrador } = this;
        return new Promise((resolve, reject) => {
            db.query(SAVE_USERS, [username, password, nombre, mail, sexo, birthday, avatar, sobremi, puntaje, administrador], (err, resp, fields) => {
                if(err) {
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

module.exports = Users;