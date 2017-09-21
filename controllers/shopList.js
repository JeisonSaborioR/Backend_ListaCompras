

var ShopList = require('../models/ShopList')

//var User = require('../models/User')


//Guarda el usuario en la base de datos
function saveShopList(req, res){

    let id = req.body.idUser

    let shopList = new ShopList()

    shopList.idUser = id
    shopList.name = req.body.name
    shopList.shopDay = req.body.shopDay
    shopList.amount = 0
    shopList.users = [id]


    shopList.save(function(error){
		if (error) {
			return res.status(500).send({message: 'Error al realizar la petición'})
		}else{         
            return res.status(200).send({message: 'Successful save!!'})

		} 
	});
   
}


//Obtiene todos los usuario registrados en la base de datos
function getShopLists(req, res){

    ShopList.find({}, (err, shopLists) =>{
        if(err) return res.status(500).send({message: 'Error al realizar la petición'})
        if(!shopLists) return res.status(404).send({message:'No existen usuarios'})
            
        res.send(200,{shopLists})
    })
}

//Borra una lista de compras a partir del id de la lista de compras
function deleteShopList(req,res){
    let shopListId = req.params.idShopList

    ShopList.findById(shopListId, (err, shopList) => {
        if(err) return res.status(500).send({message: 'Error al realizar la petición'})
        
        shopList.remove(err =>{
            if(err) return res.status(500).send({message: 'Error al realizar la petición'})
            
            return res.status(200).send({message:'ShopList delete!!!'})
        })
    })

}

//Actualiza un shop list a partir del id de la lista de compras
function updateShopList(req,res){
    let shopListId = req.params.idShopList
    let updateShopList = req.body

    ShopList.findByIdAndUpdate(shopListId,updateShopList, (err, shopList) => {
        if(err) return res.status(500).send({message: 'Error al realizar la petición'})
        
        res.status(200).send({shopList: shopList})
    })
}

//Return todas las listas de compra para el usuario logueado
function getShopListUser(req, res) {
    
    let userId = req.params.idUser
    ShopList.find({users: [userId]}, (err, shopList) =>{
        if(err) return res.status(500).send({message:'Error al realizar la petición'})
        res.send(200,{shopList})
        //res.status(200).send({shopList})
    })
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

/*
//Obtiene el usuario identificado por la idea solicitada
function getShopListById(req, res){

    let id = req.params.id

    
    User.findById(id, (err, user) =>{
        if(err) return res.status(500).send({message: 'Error al realizar la peteción'})
        if(!user) return res.status(404).send({message:'No existen usuarios'})
        var nombre = user.nombre

        console.log(user.shopList)
        res.send(200,{user})
    })
}
*/
module.exports = {
    saveShopList,
    getShopLists,
    deleteShopList,
    updateShopList,
    getShopListUser,
    updateShopListArrayUsers
   
    
}

