var express=require('express'),
    app=express();
var bodyParser=require('body-parser')
var shopRoutes=require('./routes/shop.js')
var Product=require('./models/product.js');
app.use(express.static(__dirname+"/public"))
app.use(bodyParser.urlencoded({extended:true}))
app.get('/',(req,res)=>{
	res.sendFile('views/index.html',{root:__dirname});
});
app.get('/api/shop',(req,res)=>{
	 Product.find({})
 .then((products)=>{
      res.json(products);
 })
 .catch((err)=>{
 	res.json({"error":err})
 })
});
app.listen(process.env.PORT||'3000',process.env.IP,()=>{
console.log('Server Started!')
})