var mongoose=require('mongoose');
var validator=require('validator');
var jwt=require('jsonwebtoken');
var _=require('lodash');
var bcrypt=require('bcrypt')
var userSchema=new mongoose.Schema({
	email:{
		type:String,
		required:true,
		unique:true,
		validate:{
			validator:validator.isEmail
		}
	},
	password:{
		type:String,
		minlength:6,
        required:true
	},
	tokens:[{
		access:{
			type:String,
			required:true
		},
		token:{
			type:String,
			required:true
		}
	}]
});
userSchema.pre('save',function(next){
	var user=this; 
	if(user.isModified('password')){
		
         bcrypt.genSalt(10,(err,salt)=>{
         	bcrypt.hash(user.password,salt,(err,res)=>{
               user.password=res;
               next();
         	})
         })
	}
	else
		next();
})   
userSchema.statics.findByCredentials=function(email,password){
	var User=this;
	return User.findOne({email}).then((user)=>{
		if(!user)
			return Promise.reject('Invalid E-Mail/Password!')
		else
			return new Promise((resolve,reject)=>{
				bcrypt.compare(password,user.password,(err,res)=>{
					if(res)
						resolve(user)
					else
						reject('Invalid E-Mail/Password!')
				})
			})
	})
}
userSchema.statics.findByToken=function(token){
	var User=this;
	try{
		decoded=jwt.verify(token,'mysecret');
		console.log(decoded);
	}
	catch(err){
		return Promise.reject();
	}
	return User.findOne({
		'_id':decoded._id,
		'tokens.token':token,
		'tokens.access':decoded.access
	})
}
userSchema.methods.toJSON=function(){//Overridding mongoose toJSON method
	return _.pick(this,['_id','email']);
}
userSchema.methods.generateAuthToken=function(){
	var access='auth';
    var token=jwt.sign({_id:this._id.toHexString(),access},'mysecret').toString()
    this.tokens.push({token,access});
    return this.save();
}
module.exports=mongoose.model('User',userSchema);

 