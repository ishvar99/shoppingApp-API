var express=require('express');
var router=express.Router();
var User=require('../models/users.js');
var _=require('lodash')
router.route('/')
.get((req,res)=>{
	User.find({})
	.then((users)=>{
        res.json(users);
	})
})
.post((req,res)=>{
	var body=_.pick(req.body,['email','password'])
	User.create(body)
	.then((user)=>{
        user.generateAuthToken()
        .then(()=>{
        	res.header({'auth':user.tokens[0].token}).send(user);
        })
         .catch((err)=>{
         	res.status(401);
         })
	})
})
router.get('/me',(req,res)=>{
	var token=req.header('auth')
	User.findByToken(token)
	.then((user)=>{
		res.send(user);
	})
	.catch((err)=>{
		res.status(401).send(err);
	})
})
module.exports=router