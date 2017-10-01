//Declaramos variable: express 'para hacer uso de los componentes de express, bodyParser 'lograr hacer uso de post y get en el entorno'
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
//var productCtrl = require('./controllers/product')
var api = require('./routes')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('',api)

//Cargar las carpetas a ser usadas
app.use('/controllers', express.static(__dirname + '/controllers'))


//Peteciones get para el usuario




//app.post('/registroProducto',productCtrl.registrarProduct)

module.exports = app