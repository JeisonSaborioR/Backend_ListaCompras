
var mongoose = require('mongoose')
var schema = mongoose.Schema
var User = require('../models/User')


var shopListModel = schema({
    idUser : String,
    name: String,
    shopDate: String,   
    amount: Number,
    products: Array,
    users: [{type: schema.ObjectId, ref: "User"}]
    
})



//Permite ser utilizada desde cualquier punto
module.exports = mongoose.model('ShopList', shopListModel)



   
  