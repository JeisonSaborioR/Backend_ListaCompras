'use strict'

/*
Declare variable: express to make use of the components of express, 
bodyParser to make use of post and get in the environment
*/

var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var api = require('./routes')


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('',api)

//Load folders statically to be used
app.use('/controllers', express.static(__dirname + '/controllers'))



module.exports = app