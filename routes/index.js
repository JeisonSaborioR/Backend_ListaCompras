var express = require('express')
var api = express.Router()

var productCtrl = require('../controllers/product')
var userCtrl = require('../controllers/user')
var shopListCtrl = require('../controllers/shopList')


//EndPoints para los Usuarios
api.post('/saveUser',userCtrl.saveUser)
api.post('/authenticateGoogle',userCtrl.logUserGoogle)
api.post('/authenticate',userCtrl.signIn)
api.get('/getUsers',userCtrl.getUsers)




//EndPoints para los productos
api.post('/saveProduct/:idShopL',productCtrl.saveProduct)
//api.delete('/deleteShopList/:idShopList', shopListCtrl.deleteShopList)
//api.put('/updateShopList/:idShopList',shopListCtrl.updateShopList)
//api.get('/getProducts',productCtrl.getProduct)



//EndPoints para listas de compras
api.post('/saveShopList',shopListCtrl.saveShopList)
api.get('/getShopLists',shopListCtrl.getShopLists)
api.get('/getShopListsUser/:idUser', shopListCtrl.getShopListUser)
api.delete('/deleteShopList/:idShopList', shopListCtrl.deleteShopList)
api.put('/updateShopList/:idShopList',shopListCtrl.updateShopList)

//api.get('/getShopList/:id',shopListCtrl.getShopListById)


module.exports = api