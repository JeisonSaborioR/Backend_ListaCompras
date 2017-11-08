
'use strict'

var Product = require('../models/Product')
var ShopList = require('../models/ShopList')

//Guarda un producto en su respectiva lista de compras a partir del id
function saveProduct(req, res){
  
    let idShopList = req.body.idShopList
    let product = new Product()

    product.name = req.body.name
    product.price = req.body.price
    product.image = "#"
    product.quantity = req.body.quantity
    //product.idShopList = idShopList
    product.isInCart = false 
    
    product.save(function(error){
		if (error) {
			return res.status(500).send({message: 'Request failed'})
		}else{     
            
            ShopList.update(
                {_id: idShopList},
                {$push: {products: product._id}},
                {safe: true, upsert:true},
                function(err, model) {
                    console.log(err);
                }
                
            )
            return res.status(200).send({product})
            
		} 
	});
}

//Borra un producto de una lista de compras
function deleteProduct(req,res){
    let shopListId = req.params.idShopList
    let productId = req.params.idProduct
    
    Product.findById(productId, (err, product) => {
        if(err) return res.status(500).send({message: 'Request failed'})
        
        product.remove(err =>{
            if(err) return res.status(500).send({message: 'Request failed'})
            
            return res.status(200).send({message:'Product delete!!!'})
        })
    })

}


//Actuliza un producto de la lista de compras
function updateProduct(req,res){
    let productId = req.params.idProduct
    let updateProduct = req.body

    Product.findByIdAndUpdate(productId,updateProduct, (err, product) => {
        if(err) return res.status(500).send({message: 'Request failed'})
        res.status(200).send({product: product})
    })
}

//Actuliza el estado (isInCart true o false) de un producto
function updateStateProduct(req,res){
    
        let productId = req.params.idProduct
        let shopListId  = req.params.idShopList

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

