'use strict'

/*
The endpoint routes used in the api are declared
*/
var express = require('express')
var api = express.Router()
var productCtrl = require('../controllers/product')
var userCtrl = require('../controllers/user')
var shopListCtrl = require('../controllers/shopList')


//EndPoints for users
api.post('/saveUser',userCtrl.saveUser)
api.post('/loginSocialNetwork',userCtrl.loginSocialNetwork)
api.post('/authenticate',userCtrl.signIn)
api.get('/getUsers',userCtrl.getUsers)
api.get('/getUser/:emailUser',userCtrl.getUser)

//EndPoints for products

api.post('/saveProduct',productCtrl.saveProduct)
api.delete('/deleteProduct/:idProduct/:idShopList', productCtrl.deleteProduct)
api.put('/updateProduct/:idProduct',productCtrl.updateProduct)
api.put('/updateStateProduct/:idProduct',productCtrl.updateStateProduct)

//EndPoints for shopping list
api.post('/saveShopList',shopListCtrl.saveShopList)
api.get('/getShopLists',shopListCtrl.getShopLists)
api.get('/getShopListsUser/:idUser', shopListCtrl.getShopListUser)
api.delete('/deleteShopList/:idShopList', shopListCtrl.deleteShopList)
api.put('/updateShopList/:idShopList',shopListCtrl.updateShopList)
api.put('/shareShopList/:idShopList',shopListCtrl.updateShopListArrayUsers)

 
module.exports = api