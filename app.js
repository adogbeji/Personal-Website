//jshint esversion:6

require("dotenv").config({path: "./config.env"});
const express = require("express");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// For Next Time: Adjust 'form-container' class on Contact Page to prevent gaps appearing during form submission

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.get("/sitemap.xml", (req, res) => {
  res.sendFile(__dirname + "/sitemap.xml");
});

app.get("/robots.txt", (req, res) => {
  res.sendFile(__dirname + "/robots.txt");
});

//NB: No Contact POST route - emails are being sent via Google Sheets!

const port = process.env.PORT;

app.listen(port, function() {
  console.log("Listening on port 3000...");
});
