'use strict'

var mongoose = require('mongoose')
var schema = mongoose.Schema
var bcrypt = require('bcrypt-nodejs')

//Model for the creation of user-type objects
var userModel = schema({
	name: String,
    email:  {type: String, unique: true, lowercase: true},
    passWord: {type: String},
    userImage: String
})


//Encrypt password using the bcrypt library
userModel.pre('save', function (next){
    let user = this
    bcrypt.hash(user.passWord,null,null,function(err,hash){
        if(err) return next(err)      
        user.passWord = hash
        next()
    })
})


 //Verification of password when the user is making a login
userModel.methods.comparePassword = function(passWord) {
    return bcrypt.compareSync(passWord,this.passWord)
}


//It can be used from any point
module.exports = mongoose.model('User',userModel)



   
  