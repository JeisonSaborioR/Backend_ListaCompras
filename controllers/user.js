
var User = require('../models/User')

//Guarda el usuario en la base de datos
function saveUser(req, res){

    let user = new User()
    user.nombre = req.body.nombre
    user.email = req.body.email
    user.shopLists = []

    user.save(function(error){
		if (error) {
			res.json({success:false,message:'Fail to save!!'})
		}else{
			res.json({success:true, message:'Successful save!!'})
		}
	});
}

//Obtiene todos los usuario registrados en la base de datos
function getUser(req, res){

    User.find({}, (err, users) =>{
        if(err) return res.status(500).send({message: 'Error al realizar la peteción'})
        if(!users) return res.status(404).send({message:'No existen usuarios'})
            
        res.send(200,{users})
    })
}

//Obtiene el usuario identificado por la idea solicitada
function getUserById(req, res){

    let id = req.params.id
    
    User.findById(id, (err, user) =>{
        if(err) return res.status(500).send({message: 'Error al realizar la peteción'})
        if(!user) return res.status(404).send({message:'No existen usuarios'})
        res.send(200,{user})
    })
}

module.exports = {
    saveUser,
    getUser,
    getUserById
}

