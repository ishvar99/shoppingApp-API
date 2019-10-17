var express=require('express'),
    app=express();
var bodyParser=require('body-parser')
var productRoutes=require('./routes/product.js')
var userRoutes=require('./routes/user.js')
app.use(express.static(__dirname+"/public"))
app.use(bodyParser.urlencoded({extended:true}))
app.get('/',(req,res)=>{
	res.sendFile('views/index.html',{root:__dirname});
});
app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);
app.listen(process.env.PORT||'3000',process.env.IP,()=>{
console.log('Server Started!')
})