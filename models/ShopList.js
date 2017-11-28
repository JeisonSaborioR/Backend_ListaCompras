'use strict'

var mongoose = require('mongoose')
var schema = mongoose.Schema
var User = require('../models/User')
var Product = require('../models/Product')

//Model for the creation of shoppingList-type objects
var shopListModel = schema({
    idUser : {type: schema.ObjectId, ref: "User"},
    name: String,
    shopDate: String,   
    amount: Number,
    shopTime: String,
    products:[{type: schema.Types.ObjectId, ref:"Product"}],
    users: [{type: schema.ObjectId, ref: "User"}]
    
})



//It can be used from any point
module.exports = mongoose.model('ShopList', shopListModel)



   
  