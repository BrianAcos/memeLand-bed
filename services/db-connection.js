const mysql = require('mysql');

//establesco parametros de coneccion con mi base de datos
const connection = mysql.createConnection({
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'bdf0e6d85bd1c5',
    password: '7cc6fe64',
    database: 'heroku_c29252a3ebb10d2',
});

//conecto mi base de batos
connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('DB Conected');
    }
});

module.exports = connection