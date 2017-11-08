'use strict'

var express = require('express')
var api = express.Router()
var productCtrl = require('../controllers/product')
var userCtrl = require('../controllers/user')
var shopListCtrl = require('../controllers/shopList')


//EndPoints para los Usuarios
api.post('/saveUser',userCtrl.saveUser)
api.post('/loginSocialNetwork',userCtrl.loginSocialNetwork)
api.post('/authenticate',userCtrl.signIn)
api.get('/getUsers',userCtrl.getUsers)




//EndPoints para los productos

api.post('/saveProduct',productCtrl.saveProduct)
api.delete('/deleteProduct/:idProduct', productCtrl.deleteProduct)
api.put('/updateProduct/:idProduct',productCtrl.updateProduct)
api.put('/updateStateProduct/:idProduct',productCtrl.updateStateProduct)



//EndPoints para listas de compras

api.post('/saveShopList',shopListCtrl.saveShopList)
api.get('/getShopLists',shopListCtrl.getShopLists)
api.get('/getShopListsUser/:idUser', shopListCtrl.getShopListUser)
api.delete('/deleteShopList/:idShopList', shopListCtrl.deleteShopList)
api.put('/updateShopList/:idShopList',shopListCtrl.updateShopList)
api.post('/shareShopList',shopListCtrl.updateShopListArrayUsers)




module.exports = api