//jshint esversion:6

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const nodemailer = require("nodemailer");

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


app.post("/contact", function(req, res) {
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

  //The 'transporter' connects us to the chosen e-mail service
  const transporter = nodemailer.createTransport({
   host: "smtp-mail.outlook.com",
   port: 587,
   secure: false, // true for 465, false for other ports
   auth: {
     user: process.env.EMAIL_ADDRESS, // generated ethereal user
     pass: process.env.EMAIL_PASSWORD // generated ethereal password
   }
 });

//What the e-mail will look like
 const mailOptions = {
   from: `${req.body.email}`,
   to: process.env.EMAIL_ADDRESS,
   subject: "New Client Message",
   html: output  //You MUST specify the property as 'html', otherwise it won't work!!
 };

 // Attempt to send the email
  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.render("contact-failure"); // Show a page indicating failure
    }
    else {
      res.render("contact-success"); // Show a page indicating success
    }
  });
});


app.listen(3000, function() {
  console.log("Listening on port 3000...");
});
