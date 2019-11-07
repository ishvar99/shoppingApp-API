var mongoose=require('mongoose');

var orderSchema=new mongoose.Schema(
{
	'amount':Number,
	'products':[
	{
		'title':String,
		'price':Number,
		'quantity':Number
	}
	],
	'date':Date
});


var order=mongoose.model('Order',orderSchema);


module.exports=order
