var mongoose = require('mongoose')
var schema = mongoose.Schema
var bcrypt = require('bcrypt-nodejs')


//Modelo para la creación del objeto usuario
var userModel = schema({
	nombre: String,
    email:  {type: String, unique: true, lowercase: true},
    passWord: {type: String, select:false}

})

//Encriptar password utilizando la libreria bcrypt
userModel.pre('save', function(next){
    let user = this
    bcrypt.hash(user.passWord,null,null,function(err,hash){
        if(err) return next(err)
        user.passWord = hash
        next()
    })
})
 //Verficación de password cuando el usuario este realizando login
userModel.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password,this.password);
}

//Permite ser utilizada desde cualquier punto
module.exports = mongoose.model('User',userModel)



   
  