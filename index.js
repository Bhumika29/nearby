const express = require("express");
const bodyParser = require("body-parser");
//const uuidv1 = require('uuid/v1');
const request=require("request");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);


  var key = "AIzaSyCJuRDLJZNS5yO2MhWxlCN-4FnC4L1Rs8g";
  var location = "-33.8670522,151.1957362";
  var radius = 16000;
//  var types="restaurants";
  var sensor = false;
  
app.post('/webhook',(req,res) =>{
  
  var types =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.places
      ? req.body.result.parameters.places
      : "restaurants";
	  
  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + "key=" + key + "&location=" + location + "&radius=" + radius + "&sensor=" + sensor + "&types=" + types;
    console.log(url);
 var req=request(url,function (err,response,body){

      var places = JSON.parse(body);
	  var w="";
	 for(i=0;i<5;i++)
	 {
		 w=w+"  "+places.results[i].name;
	 }
      console.log(w);
    });
	 return res.json({
    speech: w,
    displayText: w,
    source: "webhook-echo-sample"
  });
}); 
app.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
  
 
});