'use strict'

var ShopList = require('../models/ShopList')

//Save the shopping list in the database
function saveShopList(req, res){

    let idUser = req.body.idUser
    let shopList = new ShopList()

    shopList.idUser = idUser
    shopList.name = req.body.name
    shopList.shopDate = req.body.shopDate
    shopList.shopTime = req.body.shopTime
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



// Get all shopping list registered in the database
function getShopLists(req, res){

    ShopList.find({}, (err, shopLists) =>{
        if(err) return res.status(500).send({message: 'Request failed'})
        if(!shopLists) return res.status(404).send({message:'Unregistered user'})

        return res.status(200).send({shopLists})
    })
}

//Delete a shopping list with id
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

//Update a shopping list with id
function updateShopList(req,res){
    let shopListId = req.params.idShopList
    let updateShopList = req.body

    ShopList.findByIdAndUpdate(shopListId,updateShopList, (err, shopList) => {
        if(err) return res.status(500).send({message: 'Request failed'})
        ShopList.findById(shopList._id, (err, shopListR) => {
            if(err) return res.status(500).send({message: 'Request failed'})
            res.status(200).send({shopList: shopListR})
        })
        
    })
}

// Return all shopping lists for the logged in user
function getShopListUser(req, res) {
   
    let userId = req.params.idUser
    ShopList.
    find({users: userId}).
    populate('products'). 
    exec(function (err, shopLists) {
        if (err) return err
        return res.status(200).send(shopLists)
    });
} 


// Update the user array by each shopping list
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

// Allows you to use the functions in other scripts
module.exports = {
    saveShopList,
    getShopLists,
    deleteShopList,
    updateShopList,
    getShopListUser,
    updateShopListArrayUsers 
}

