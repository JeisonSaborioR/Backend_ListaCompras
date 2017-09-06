var mongoose = require('mongoose')
var schema = mongoose.Schema



var datosModel = schema({
	nombre: String,
    email: String,
    shopLists: Array

})



//Permite ser utilizada desde cualquier punto
module.exports = mongoose.model('User',datosModel)



   
  