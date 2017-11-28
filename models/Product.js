'use strict'

var mongoose = require('mongoose')
var schema = mongoose.Schema


//Model for the creation of product-type objects
var productModel = schema({
	name: String,
    price: Number,
    image: String,
    quantity: Number,
    isInCart: Boolean 
})



//It can be used from any point
module.exports = mongoose.model('Product',productModel)



   
  