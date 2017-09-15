
var Product = require('../models/Product')
var ShopList = require('../models/ShopList')
function saveProduct(req, res){
  
    let idShopList = req.params.idShopL
    
    let product = new Product()
    product.nombre = req.body.nombre
    product.precio = req.body.precio
    product.imagen = "#"
    product.cantidad = req.body.cantidad
    product.isInCart = false 
    
    ShopList.findOneAndUpdate(
        {_id: idShopList},
        {$push: {products: product}},
        {safe: true, upsert: true},
        function(err, model) {
            console.log(err);
        }
        
    )
    res.send(200,{product})
}
/*
function getProduct(req, res){
    Product.find({}, (err, products) =>{
        if(err) return res.status(500).send({message: 'Error al realizar la peteción'})
        if(!products) return res.status(404).send({message:'No existen productos'})
            
            
        res.send(200,{products})
    })
}
*/

module.exports = {
    saveProduct,
    //getProduct
}

