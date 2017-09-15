var express = require('express')
var api = express.Router()

var productCtrl = require('../controllers/product')
var userCtrl = require('../controllers/user')
var shopListCtrl = require('../controllers/shopList')


//EndPoints para los Usuarios
api.post('/saveUser',userCtrl.saveUser)
api.post('/authenticateGoogle',userCtrl.logUserGoogle)
api.get('/getUser',userCtrl.getUsers)
api.get('/authenticate/:email',userCtrl.signIn)



//EndPoints para los productos
api.post('/saveProduct/:idShopL',productCtrl.saveProduct)
//api.get('/getProducts',productCtrl.getProduct)



//EndPoints para listas de compras
api.post('/saveShopList/:id',shopListCtrl.saveShopList)
api.get('/getShopLists',shopListCtrl.getShopLists)
//api.get('/getShopList/:id',shopListCtrl.getShopListById)


module.exports = api