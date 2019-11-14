var mongoose=require('mongoose');

var favoriteSchema=new mongoose.Schema({
userId:{
	productId:Boolean
}
});

var Favorite=mongoose.model('Favorite',favoriteSchema)
Favorite.create({
"jflksdjf123424":{
	"fjkdlflkfj230982":true
}
},(err,res)=>{
	if(!err)
	console.log(res);
})
module.exports=Favorite