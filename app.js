//jshint esversion:6
const express = require("express");

const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apiKey = "d8a3ea6ef4d77e69a17fac32af2b1047 ";
    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        query +
        "& appid=" + apiKey + "&units=imperial";

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            // const clouds = weatherData.clouds.all;
            const weatherDescription = weatherData.weather[0].description;
            // const wind = weatherData.wind;
            // const base = weatherData.base;
            const icon = weatherData.weather[0].icon;
            const imageURL =
                "http://openweathermap.org/img/wn/" + icon + "10d@2x.png ";


            res.write("<h1>The temprature in " + query + "is" + temp +
                "degree celcius. </h1>");
            // res.write("<h2>Today cloud are" + clouds + "all sides</h2>");
            res.write("<p>weather Description are" + weatherDescription + "</p>");
            // res.write("<h3> todays wind are" + wind + "</h3");
            // res.write("base is" + base + " !");
            res.write("<img src =" + imageURL + ">");
            res.send();
        });
    });
})

app.listen(3000, function(req, res) {
    console.log(" the server started at the point 3000 ");
});