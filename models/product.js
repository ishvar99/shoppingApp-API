var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/shop-app"||process.env.DATABASEURL,{ useNewUrlParser: true });

var productSchema=new mongoose.Schema({
	'ownerId':{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
	},
    'title':String,
    'description':String,
    'price':Number,
    'imageUrl':String,
    'isFavorite':Boolean
});

module.exports=mongoose.model('Product',productSchema);