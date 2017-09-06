

var ShopList = require('../models/ShopList')
var User = require('../models/User')

//Guarda el usuario en la base de datos
function saveShopList(req, res){

    let id = req.params.id

    let shopList = new ShopList()
    shopList.nombre = req.body.nombre
    shopList.fechaCompra = "30/08/2017"
    shopList.montoTotal = 0
    shopList.products = []
    shopList.users = []


    User.findById(id, (err, userTemp) =>{

        if(err) return res.status(500).send({message: 'Error al realizar la peteción'})
        if(!userTemp) 
            return res.status(404).send({message:'No existen usuarios'})
        else
            console.log(userTemp.shopList)
        
            userTemp.shopList.save(function(error){
                if (error) {
                    res.json({success:false,message:'Fail to save!!'})
                }else{
                    res.json({success:true, message:'Successful save!!'})
                }
            });

        
        
    })
   
}


//Obtiene todos los usuario registrados en la base de datos
function getShopLists(req, res){

    User.find({}, (err, users) =>{
        if(err) return res.status(500).send({message: 'Error al realizar la peteción'})
        if(!users) return res.status(404).send({message:'No existen usuarios'})
            
        res.send(200,{users})
    })
}

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

module.exports = {
    saveShopList,
    getShopListById,
    getShopLists
}

