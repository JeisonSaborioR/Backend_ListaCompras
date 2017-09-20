
var mongoose = require('mongoose')
var schema = mongoose.Schema
var User = require('../models/User')
//var Product = require('../models/Product')
//var User = require('../models/User')


var shopListModel = schema({
    user : String,
    nombre: String,
    fechaCompra: String,   
    montoTotal: Number,
    products: Array,
    users: [{type: schema.ObjectId, ref: "User"}]
    
})



//Permite ser utilizada desde cualquier punto
module.exports = mongoose.model('ShopList', shopListModel)



   
  