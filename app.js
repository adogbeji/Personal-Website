//jshint esversion:6

require("dotenv").config({path: "./config.env"});
const express = require("express");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/sitemap.xml", (req, res) => {
  res.sendFile(__dirname + "/sitemap.xml");
});

app.get("/robots.txt", (req, res) => {
  res.sendFile(__dirname + "/robots.txt");
});

app.get("/failure", (req, res) => {  // Test Route
  res.render("contact-failure");
});

// No Contact Post Route - Emails are being sent through Google Sheets!

const port = process.env.PORT;

app.listen(port, function() {
  console.log("Listening on port 3000...");
});
