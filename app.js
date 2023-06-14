const express=require ("express");
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended:true}))
const https=require ("https");
app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html")
    })
  app.post("/",function(req,res){
    
    const query=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=ae191b02983a3b07f95bdd8889ae505f&units=metric"
https.get(url,function(response){
  console.log(response.statusCode);
  response.on("data",function(data){
   const weatherdata=   JSON.parse(data);
   const temp=weatherdata.main.temp;
   const weatherDescription=weatherdata.weather[0].description;
   const icon=weatherdata.weather[0].icon;
   const imageUrl= "https://openweathermap.org/img/wn/"+icon+"@2x.png";
   
      console.log(temp);
      console.log(weatherDescription);
      res.write("<h1>The temperature of "+ query+" is "+" "+temp+"degree celcius</h1>");
      res.write("weather is currently"+weatherDescription);
      res.write("<img src="+imageUrl+">");
      res.send();})

  })})
    

 app.listen(3000,function(){
     console.log("server is running at port 3000");
 })
