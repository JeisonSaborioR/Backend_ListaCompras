
var Product = require('../models/Product')
var ShopList = require('../models/ShopList')

//Guarda un producto en su respectiva lista de compras a partir del id
function saveProduct(req, res){
  
    let idShopList = req.body.idShopList
    console.log(idShopList)
    let product = new Product()
    product.name = req.body.name
    product.price = req.body.price
    product.image = "#"
    product.quantity = req.body.quantity
    product.isInCart = false 
    
    ShopList.update(
        {_id: idShopList},
        {$push: {products: product}},
        {safe: true, upsert: true},
        function(err, model) {
            console.log(err);
        }
        
    )
    res.send(200,{product})
}


//Borra un producto de una lista de compras
function deleteProduct(req,res){
    let productId = req.params.idProduct
    let shopListId  = req.body.idShopList

    console.log(productId)
    ShopList.find({_id: shopListId}, (err,shopList) => {
        
        if(err) return res.status(500).send({message: 'Error al realizar la petición'})
        if(!shopList) return res.status(404).send({message:'No existen usuarios'})
        console.log(shopList)
        shopList.find({products: {_id: productId}}, (err,product) => {
            console.log(product)
            /*
            product.remove(err =>{
                if(err) return res.status(500).send({message: 'Error al realizar la petición'})
                return res.status(200).send({message:'ShopList delete!!!'})
            })
            */
        })
    })

    /*
    console.log(productId)
    console.log(shopListId)
    ShopList.update(
        {_id: shopListId},
        {$pull: {products: {_id: productId}}},
        {multi: true},
        function(err, model) {
            console.log(err);
        }
        
    )
    */
}

//Actuliza un producto de la lista de compras
function updateProduct(req,res){

    let productId = req.params.idProduct
    let shopListId  = req.body.idShopList
    console.log(productId)
    ShopList.update(
        {_id: shopListId,"products._id":productId},
        {$set: {"products.$": req.body}},
        {multi: true},
        function(err, model) {
            console.log(err);
        }
        
    )


}

//Actuliza el estado (isInCart true o false) de un producto
function updateStateProduct(req,res){
    
        let productId = req.params.idProduct
        let shopListId  = req.body.idShopList
    
    
        ShopList.update(
            {_id: shopListId,"products._id":productId},
            {$set: {"products.$": req.body}},
            {multi: true},
            function(err, model) {
                console.log(err);
            }
            
        )
}

module.exports = {
    saveProduct,
    deleteProduct,
    updateProduct,
    updateStateProduct

    //getProduct
}

