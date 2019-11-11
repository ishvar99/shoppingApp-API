var User=require('../models/users.js');

var authenticate=function(req,res,next){
	var token=req.header('x-auth');
	User.findByToken(token).then((user)=>{
		if(!user){
			return Promise.reject();
		}
		next();
	})
	.catch((err)=>{
		res.status(401).send();
	})
}
module.exports=authenticate;