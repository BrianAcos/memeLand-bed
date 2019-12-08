const db = require('../services/db-connection');

const GET_USERS = 'SELECT * FROM users';
const GET_USER_ID = 'SELECT * FROM users WHERE username = ?';
const SAVE_USERS = 'INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)';
const DELETE_USER = 'DELETE FROM users WHERE username = ?';
const MODIFY_USER = 'UPDATE users SET nombre = ?, sexo = ?, birthday = ?, avatar = ?, sobremi = ? WHERE username = ?';

class Users {
    constructor(username, password, nombre, email, sexo, birthday, avatar, sobremi, administrador) {
        this.username = username;
        this.password = password;
        this.nombre = nombre;
        this.email = email;
        this.sexo = sexo;
        this.birthday = birthday;
        this.avatar = avatar;
        this.sobremi = sobremi;
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
                    const modelUser = new Users(user.username, user.password, user.nombre, user.email, user.sexo, user.birthday, user.avatar, user.sobremi, user.administrador);
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
                        const { username, password, nombre, email, sexo, birthday, avatar, sobremi, administrador } = result;
                        return new Users(username, password, nombre, email, sexo, birthday, avatar, sobremi, administrador)
                     });
                     resolve(users)
                }
            });
        });
    }

    static deleteUserById(ID, password) {
        return new Promise((resolve, reject) => {
            db.query(GET_USER_ID, [ID], (error, result) => {
                if (error) {
                    reject(error)
                } else if (result[0] === undefined) {
                    reject(404)
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

    static modifyUserById(id, nombre, sexo, birthday, avatar, sobremi) {
        return new Promise((resolve, reject) => {
            db.query(MODIFY_USER, [nombre, sexo, birthday, avatar, sobremi, id], (err, result) =>  {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    save() {
        const { username, password, nombre, email, sexo, birthday, avatar, sobremi, administrador } = this;
        return new Promise((resolve, reject) => {
            db.query(SAVE_USERS, [username, password, nombre, email, sexo, birthday, avatar, sobremi, administrador], (err, resp, fields) => {
                const errno = err ? err.errno : err;
                if(errno === 1062) {
                    reject('email o usuario existente');
                } else if (errno) {
                    reject(errno);
                } else {
                    resolve();
                }
            });
        });
    }

    static convertJSON(string) {
        return JSON.stringify(string);
    }
}

module.exports = Users;