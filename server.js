const express=require('express');
const path=require('path');
const app=express();
//app.use(express.static(__dirname+'/dist/MCZA6'));

app.use(express.static(path.join(__dirname+'/dist/mcza6')));
const port=process.env.PORT||8080;
app.get('/*',function(req,res){

res.sendFile('./dist/mcza6/index.html');
//res.send(__dirname+'/dist/MCZA6");
//res.sendFile(path.join(__dirname+'/dist/mcza6/index.html'));
//res.send("Hello World");


});

app.listen(port,function(){

console.log("Server is running at port:"+port);

});