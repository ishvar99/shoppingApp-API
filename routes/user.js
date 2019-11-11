var express=require('express');
var router=express.Router();
var User=require('../models/users.js');
var _=require('lodash')
router.get('/',(req,res)=>{
	User.find({})
	.then((users)=>{
        res.json(users);
	})
})
router.post('/signup',(req,res)=>{
	var body=_.pick(req.body,['email','password'])
	User.create(body)
	.then((user)=>{
        user.generateAuthToken()
        .then(()=>{
        	res.header('x-auth',token).json({'id':user._id,'token':user.tokens[0].token});
        })
         .catch((err)=>{
         	res.status(401);
         })
	})
	.catch((err)=>{
		res.json(err)
	})
});
router.post('/login',(req,res)=>{
	var body=_.pick(req.body,['email','password'])
	User.findByCredentials(body.email,body.password)
	.then(function(user){
		if(!user)
			return;
		else{
           user.generateAuthToken()
           .then(()=>{
           	res.header('x-auth',user.tokens[0].toke).json({'id':user._id,'token':user.tokens[0].token})
           })
		}
	})
	.catch((err)=>{
		res.json({'errmsg':err})
	})
})
router.get('/me',(req,res)=>{
	var token=req.header('x-auth')
	User.findByToken(token)
	.then((user)=>{
		res.send(user);
	})
	.catch((err)=>{
		res.status(401).send(err);
	})
})
module.exports=router