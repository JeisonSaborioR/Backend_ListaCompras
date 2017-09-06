var express = require('express')
var api = express.Router()

var productCtrl = require('../controllers/product')
var userCtrl = require('../controllers/user')
var shopListCtrl = require('../controllers/shopList')

//EndPoints para los productos
api.post('/saveProduct',productCtrl.saveProduct)
api.get('/getProducts',productCtrl.getProduct)


//EndPoints para los Usuarios
api.post('/saveUser',userCtrl.saveUser)
api.get('/getUser',userCtrl.getUser)
api.get('/getUserById/:id',userCtrl.getUserById)

//EndPoints para listas de compras
api.post('/saveShopList/:id',shopListCtrl.saveShopList)
api.get('/getShopLists',shopListCtrl.getShopLists)
api.get('/getShopList/:id',shopListCtrl.getShopListById)


api.post('/saveShopList/:id', shopListCtrl.saveShopList)
module.exports = api