'use strict'

/*
Export diferent variables, to be accessed from another class
*/
module.exports = {
    port: process.env.PORT || 8080,
    db: 'mongodb://js:123@ds129004.mlab.com:29004/heroku_7gsdqtn6' || 'mongodb://localhost/ProyectoSoftware' 
}