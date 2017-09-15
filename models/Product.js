var mongoose = require('mongoose')
var schema = mongoose.Schema



var productModel = schema({
	nombre: String,
    precio: Number,
    imagen: String,
    cantidad: Number,
    isInCart: Boolean 
})



//Permite ser utilizada desde cualquier punto
module.exports = mongoose.model('Product',productModel)



   
  