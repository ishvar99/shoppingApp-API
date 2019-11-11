var express=require('express');
var Product=require('../models/product.js');
var authenticate=require('../middleware/authenticate.js')
var router=express.Router();
router.get('/',authenticate,(req,res)=>{
 Product.find({})
 .then((products)=>{
      res.json(products);
 })
 .catch((err)=>{
 	res.json({"error":err})
 })
})
router.post('/',authenticate,(req,res)=>{
   Product.create(
   req.body
   ).then((product)=>{
   	res.json(product)
   })
   .catch((err)=>{
   	console.log(err)
   })
})
router.patch('/:id',authenticate,(req,res)=>{
    Product.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
    .then((foundProduct)=>{
    	res.json(foundProduct)
    })
    .catch((err)=>{
    	console.log(err)
    })
});
router.delete('/:id',authenticate,(req,res)=>{
	Product.findOneAndRemove({_id:req.params.id})
	.catch((err)=>{
		console.log(err)
	})
})
module.exports=router


