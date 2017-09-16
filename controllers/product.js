
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



function deleteShopList(req,res){
    let shopListId = req.params.idShopList
    let productId  = req.body.idProduct


    ShopList.update(
        {_id: shopListId},
        {$pull: {_id: productId}},
        {multi: true},
        function(err, model) {
            console.log(err);
        }
        
    )
}


function updateShopList(req,res){
    let shopListId = req.params.idShopList
    let updateShopList = req.body

    ShopList.findByIdAndUpdate(shopListIdm,updateShopList, (err, shopList) => {
        if(err) return res.status(500).send({message: 'Error al realizar la petición'})
        
        res.status(200).send({shopList: shopList})
    })
}

module.exports = {
    saveProduct,
    //getProduct
}

