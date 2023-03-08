const { query } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "ccbb362f1c7ae53a28ba77c70fe12429";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const Weatherdata = JSON.parse(data);
      const temp = Weatherdata.main.temp;
      console.log(temp);

      const desci = Weatherdata.weather[0].description;

      const icon = Weatherdata.weather[0].icon;
      const imageURL = "http://open.weathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<h1>The temperature in " +
          query +
          "is" +
          temp +
          " degree celcius & </h1>"
      );
      res.write("<p>weather is currently " + desci + ".</p>");
      res.write("<img src=" + imageURL + ">");
      res.send();
      //res.send("<h1>The temperature in London is : " + temp + " degree celcius & " + " Weather is "+desci+ ".<h1>");
    });
  });
});

app.listen(3000, function () {
  console.log("server is running");
});

/* BoilerPlater for node project
 
const express = require('express');
const app = express();

app.get('/', function(req, res){
    
});


app.listen(3000,function(){
    console.log('server is running');
});
*/
