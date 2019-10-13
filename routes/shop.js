var express=require('express');
var Product=require('../models/product.js');
var router=express.Router();
router.route('/')
.get((req,res)=>{
 Product.find({},(err,products)=>{
 	  if(err)
 	  	res.json({
 	  		"Error":err
 	  	})
 	  else
      res.json(products);
 });
})
.post((req,res)=>{
   Product.create(
   	req.body
   ,(product)=>{
   	res.json(product)
   })
})
module.exports=router