const mysql = require('mysql');
const config = require('../config');

//establesco parametros de coneccion con mi base de datos
const connection = mysql.createConnection(
    config.production ?
    {
        host: 'us-cdbr-east-02.cleardb.com',
        user: 'bdf0e6d85bd1c5',
        password: '7cc6fe64',
        database: 'heroku_c29252a3ebb10d2',
    } :
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'memeland',
    }
);
    
//conecto mi base de batos
connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('DB Conected');
    }
});

module.exports = connection