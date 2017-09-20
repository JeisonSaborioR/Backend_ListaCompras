
var User = require('../models/User')
var bcrypt = require('bcrypt-nodejs')

//Guarda el usuario en la base de datos que realicen el registro
function saveUser(req, res){

    let user = new User()
    user.name = req.body.name
    user.email = req.body.email
    user.password = req.body.password

    user.save(function(error){
		if (error) {
           
			res.json({success:false,message:'Username or email already exists!'})
		}else{
			res.json({success:true, message:'Successful save!!'})
		}
	});
}

//Guarda los usuarios en la base de datos que realicen el login por medio de Google
function logUserGoogle(req, res){

    let user = new User()

    user.name = req.body.name
    user.email = req.body.email
    
    user.save(function(error){
		if (error) {
            let email = req.body.email
            
            User.findOne({email: email}, (err, user) =>{
                if(err) return res.status(500).send({message: 'Error al realizar la peteción'})
                if(!user) return res.status(404).send({message:'No existen usuarios'})
                return res.status(200).send({user})
            })
            //res.json({success:false,message:'Username or email already exists!'})
		}else{
			return res.status(200).send({user})
		}
	});
}


//Obtiene todos los usuario registrados en la base de datos
function getUsers(req, res){

    User.find({}, (err, users) =>{
        if(err) return res.status(500).send({message: 'Error al realizar la petición'})
        if(!users) return res.status(404).send({message:'No existen usuarios'})
            
        return res.status(200).send({users})
    })
}


//Permite la autentificación en un logueo normal por parte del usuario
function signIn(req, res){
    let email = req.body.email
    
    User.findOne({email: email}, (err, user) =>{
        if(err) throw err
        
        if(!user){
           return res.status(500).send({message: 'Could not authenticate user!'})
        }else {
            var validPassword = user.comparePassword(req.body.password)
            if(validPassword){
                return res.status(200).send({user})
			}else{
				
				return res.status(500).send({message:'Could not authenticate user!'})
			}
        }
    })
}

//Permite utilizar las funciones en otros scripts
module.exports = {
    saveUser,
    logUserGoogle,
    getUsers,
    signIn
}

