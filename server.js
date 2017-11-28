'use strict'
/*
Class for the connection to the database, 
likewise it has to listen to the server
*/
var mongoose = require('mongoose')
var config = require('./config')
var app = require('./app')

//Connection to database
mongoose.connect(config.db, (err, res) => {
    if(err) {
        return console.log('Error al conectar a la base de datos')
    }
    console.log('Conexión establecida')

//The server start to listen
app.listen(config.port,() => {
        console.log('Running at Port 8080')
    })
})