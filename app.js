//jshint esversion:6

const path = require("path");
require("dotenv").config({path: path.join(__dirname, ".env")});
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const sgMail = require("@sendgrid/mail");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

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

app.post("/contact", function(req, res) {
  // What the e-mail will look like
  const output = `{
    <h3>You have a new contact request</h3>
    <h3>Contact Details:</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message:</h3>
    <p>${req.body.message}</p>
  }`;

  //This sets API key on 'sgMail' object
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  //What the e-mail will look like
  const msg = {
    to: process.env.EMAIL_ADDRESS,
    from: `${req.body.email}`,
    subject: "New Client Message",
    html: output
  };

  //We now use 'sgMail' object to send email
  sgMail.send(msg)
  .then(() => {
    res.render("contact-success");
  })
  .catch(err => {
    res.render("contact-failure");
  });
});


app.listen(3000, function() {
  console.log("Listening on port 3000...");
});
