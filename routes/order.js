var express=require('express');
var router=express.Router();
var Order=require('../models/order.js');

router.route('/')
.get((req,res)=>{
Order.find({})
.then((orders)=>{
	res.json(orders)
});
})
.post((req,res)=>{
	Order.create(req.body)
	.then((order)=>{
		console.log(order);
	    res.json(order);
	})
});

module.exports=router;