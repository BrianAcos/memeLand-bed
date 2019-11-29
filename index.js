const app = require('./server');
const config = require('./config');

//Levanto la aplicación
app.listen(config.PORT, function () {
    console.log("App corriendo en el puerto " + config.PORT);
});