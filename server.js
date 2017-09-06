
var mongoose = require('mongoose')
var config = require('./config')
var app = require('./app')




//Se ejecuta el servidor 
mongoose.connect(config.db, (err, res) => {
    if(err) {
        return console.log('Error al conectar a la base de datos')
    }
    console.log('Conexión establecida')

    app.listen(config.port,() => {
        console.log('Running at Port 8080')
    })
})