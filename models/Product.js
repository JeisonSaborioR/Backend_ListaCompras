'use strict'

var mongoose = require('mongoose')
var schema = mongoose.Schema



var productModel = schema({
	name: String,
    price: Number,
    image: String,
    quantity: Number,
    //idShopList: {type: schema.ObjectId, ref: "ShopList"},
    isInCart: Boolean 
})



//Permite ser utilizada desde cualquier punto
module.exports = mongoose.model('Product',productModel)



   
  