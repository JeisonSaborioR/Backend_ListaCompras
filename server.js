
var mongoose = require('mongoose')
var config = require('./config')
var app = require('./app')




//Conexión con la base de datos
mongoose.connect(config.db, (err, res) => {
    if(err) {
        return console.log('Error al conectar a la base de datos')
    }
    console.log('Conexión establecida')

//Pone a escuchar el servidor
    app.listen(config.port,() => {
        console.log('Running at Port 8080')
    })
})