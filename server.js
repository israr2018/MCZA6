const experss=require('express');
const path=require('path');
const app=express();
app.use(express.static(__dirname+'/dist/MCZA6'));
app.get('/*',function(req,res){

res.send('./dist/index.html');


});

app.list(process.env.PORT||8080);