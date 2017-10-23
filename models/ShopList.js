'use strict'

var mongoose = require('mongoose')
var schema = mongoose.Schema
var User = require('../models/User')
var Product = require('../models/Product')

var shopListModel = schema({
    idUser : {type: schema.ObjectId, ref: "User"},
    name: String,
    shopDate: String,   
    amount: Number,
    products:[{type: schema.Types.ObjectId, ref:"Product"}],
    users: [{type: schema.ObjectId, ref: "User"}]
    
})



//Permite ser utilizada desde cualquier punto
module.exports = mongoose.model('ShopList', shopListModel)



   
  