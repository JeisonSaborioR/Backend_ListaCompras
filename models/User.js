'use strict'

var mongoose = require('mongoose')
var schema = mongoose.Schema
var bcrypt = require('bcrypt-nodejs')

//Modelo para la creación del objeto usuario
var userModel = schema({
	name: String,
    email:  {type: String, unique: true, lowercase: true},
    passWord: {type: String},
    userImage: String
})


//Encriptar password utilizando la libreria bcrypt
userModel.pre('save', function (next){
    let user = this
    bcrypt.hash(user.passWord,null,null,function(err,hash){
        if(err) return next(err)      
        user.passWord = hash
        next()
    })
})


 //Verficación de password cuando el usuario este realizando login
userModel.methods.comparePassword = function(passWord) {
    return bcrypt.compareSync(passWord,this.passWord)
}


//Permite ser utilizada desde cualquier punto
module.exports = mongoose.model('User',userModel)



   
  