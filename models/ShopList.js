
var mongoose = require('mongoose')
var schema = mongoose.Schema



var datosModel = schema({

    nombre: String,
    fechaCompra: String,   
    montoTotal: Number,
    cantidad: Number,
    products: Array,
    users: Array

})



//Permite ser utilizada desde cualquier punto
module.exports = mongoose.model('ShopList', datosModel)



   
  