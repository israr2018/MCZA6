const experss=require('express');
//const path=require('path');
const app=express();
//app.use(express.static(__dirname+'/dist/MCZA6'));
const port=process.env.PORT;
app.get('/*',function(req,res){

//res.send('./dist/MCZA6/index.html');
res.send("hello world");


});

app.list(port);