var express=require('express');
var Product=require('../models/product.js');
var router=express.Router();
router.route('/')
.get((req,res)=>{
 Product.find({})
 .then((products)=>{
      res.json(products);
 })
 .catch((err)=>{
 	res.json({"error":err})
 })
})
.post((req,res)=>{
	console.log(req.body);
   Product.create(
   req.body
   ).then((product)=>{
   	res.json(product)
   })
   .catch((err)=>{
   	console.log(err)
   })
})
router.patch('/:id',(req,res)=>{
    Product.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
    .then((foundProduct)=>{
    	res.json(foundProduct)
    })
    .catch((err)=>{
    	console.log(err)
    })
});
router.delete('/:id',(req,res)=>{
	Product.findOneAndRemove({_id:req.params.id})
	.catch((err)=>{
		console.log(err)
	})
})
module.exports=router


