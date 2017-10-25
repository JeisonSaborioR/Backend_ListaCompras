'use strict'

var ShopList = require('../models/ShopList')

//var User = require('../models/User')


//Guarda el usuario en la base de datos
function saveShopList(req, res){

    let idUser = req.body.idUser
    let shopList = new ShopList()

    shopList.idUser = idUser
    shopList.name = req.body.name
    shopList.shopDate = req.body.shopDate
    shopList.amount = 0
    shopList.users = [idUser]


    shopList.save(function(error){
		if (error) {
			return res.status(500).send({message: 'Request failed'})
		}else{         
            return res.status(200).send({shopList})

		} 
	});
   
}


//Obtiene todos los usuario registrados en la base de datos
function getShopLists(req, res){

    ShopList.find({}, (err, shopLists) =>{
        if(err) return res.status(500).send({message: 'Request failed'})
        if(!shopLists) return res.status(404).send({message:'Unregistered user'})
            
        res.send(200,{shopLists})
    })
}

//Borra una lista de compras a partir del id de la lista de compras
function deleteShopList(req,res){
    let shopListId = req.params.idShopList

    ShopList.findById(shopListId, (err, shopList) => {
        if(err) return res.status(500).send({message: 'Request failed'})

        if(!shopList) return res.status(404).send({message:'Unregistered shopList'})            

        shopList.remove(err =>{
            if(err) return res.status(500).send({message: 'Request failed'})
            
            return res.status(200).send({message:'ShopList delete!!!'})
        })
    })

}

//Actualiza un shop list a partir del id de la lista de compras
function updateShopList(req,res){
    let shopListId = req.params.idShopList
    let updateShopList = req.body

    ShopList.findByIdAndUpdate(shopListId,updateShopList, (err, shopList) => {
        if(err) return res.status(500).send({message: 'Request failed'})
        
        res.status(200).send({shopList: shopList})
    })
}

//Return todas las listas de compra para el usuario logueado
function getShopListUser(req, res) {
    
    let userId = req.params.idUser
    ShopList.
    find({ users: [userId] }).
    populate('products'). // only works if we pushed refs to children
    exec(function (err, shopLists) {
        if (err) return err
        res.status(200).send({shopLists})
    });
} 

//Actuliza el array de usuarios por parte de cada listas de compras
function updateShopListArrayUsers(req,res){
    
    let shopListId = req.params.idShopList
    let userId  = req.body.idUser


    ShopList.update(
        {_id: shopListId},
        {$push: {users: userId}},
        {safe: true, upsert:true},
        function(err, model) {
            console.log(err);
        }
        
    )
}


module.exports = {
    saveShopList,
    getShopLists,
    deleteShopList,
    updateShopList,
    getShopListUser,
    updateShopListArrayUsers 
}

