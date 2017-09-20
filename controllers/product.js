
var Product = require('../models/Product')
var ShopList = require('../models/ShopList')

//Guarda un producto en su respectiva lista de compras a partir del id
function saveProduct(req, res){
  
    let idShopList = req.body.idShopList
    console.log(idShopList)
    let product = new Product()
    product.nombre = req.body.nombre
    product.precio = req.body.precio
    product.imagen = "#"
    product.cantidad = req.body.cantidad
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

    ShopList.find({}, (err, shopLists) =>{
        if(err) return res.status(500).send({message: 'Error al realizar la petición'})
        if(!shopLists) return res.status(404).send({message:'No existen usuarios'})
            
        res.send(200,{shopLists})
    })
    ShopList.find({products: {_id:shopListId}}, (err,ShopList) => {
        if(err) return res.status(500).send({message: 'Error al realizar la petición'})
        if(!shopLists) return res

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

