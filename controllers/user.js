'use strict'

var User = require('../models/User')
var bcrypt = require('bcrypt-nodejs')

//Saves the user in the database that performs the registration
function saveUser(req, res){
    
    let user = new User()

    user.email = req.body.email,
    user.name = req.body.name,
    user.passWord = req.body.password,
    user.userImage = req.body.userImage

    user.save(function(error){
		if (error) {
            return res.status(500).send({message: 'Username or email already exists!'})
		}else{
			return res.status(200).send({user})
		}
	});
}

//Save the users in the database that perform the login through Google
function loginSocialNetwork(req, res){
    
    let user = new User()

    user.name = req.body.name
    user.email = req.body.email
    user.userImage = req.body.userImage
    
    user.save(function(error){
		if (error) {
            let email = req.body.email
            
            User.findOne({email: email}, (err, user) =>{
                if(err) return res.status(500).send({message: 'Request failed'})
                if(!user) return res.status(404).send({message:'Unregistered user'})
                return res.status(200).send({user})
            })
           
		}else{
			return res.status(200).send({user})
		}
	});
}


//Get all registered users in the database
function getUsers(req, res){

    User.find({}, (err, users) =>{
        if(err) return res.status(500).send({message: 'Request failed'})
        if(!users) return res.status(404).send({message:'Unregistered user'})
      
        return res.status(200).send({users})
    })
}

//Get one user by email
function getUser(req, res){
    let emailUser = req.params.emailUser

    User.findOne({email: emailUser}, (err, user) =>{
        if(err) return res.status(500).send({message: 'Request failed'})
        if(!user) return res.status(404).send({message:'Unregistered user'})
        
        return res.status(200).send({user})
    })
}
    

//Allows authentication in a normal login by the user
function signIn(req, res){
    let email = req.body.email
   
    User.findOne({email: email}, (err, user) =>{
    
        if(err) return res.status(503).send({message: 'Could not authenticate user!'})
        
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




// Allows you to use the functions in other scripts
module.exports = {
    saveUser,
    loginSocialNetwork,
    getUsers,
    getUser,
    signIn
}

