var express=require('express'),
    app=express();
var bodyParser=require('body-parser')
var productRoutes=require('./routes/product.js')
var orderRoutes=require('./routes/order.js');
var userRoutes=require('./routes/user.js')
app.use(express.static(__dirname+"/public"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.get('/',(req,res)=>{
	res.sendFile('views/index.html',{root:__dirname});
});
app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/orders',orderRoutes);
app.listen(process.env.PORT||'3000',process.env.IP,()=>{
console.log('Server Started!')
})