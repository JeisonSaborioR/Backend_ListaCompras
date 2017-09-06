
var Product = require('../models/Product')

function saveProduct(req, res){
    
    let product = new Product()
    product.nombre = req.body.nombre
    product.precio = req.body.precio
    product.imagen = req.body.imagen
    product.cantidad = req.body.cantidad
    product.isInCart = false


    product.save(function(error){
		if (error) {
			res.json({success:false,message:'Fail to save!!'})
		}else{
			res.json({success:true, message:'Successful save!!'})
		}
	});
}


function getProduct(req, res){
    Product.find({}, (err, products) =>{
        if(err) return res.status(500).send({message: 'Error al realizar la peteción'})
        if(!products) return res.status(404).send({message:'No existen productos'})
            
            
        res.send(200,{products})
    })
}

module.exports = {
    saveProduct,
    getProduct
}

