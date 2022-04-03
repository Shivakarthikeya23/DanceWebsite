const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser = require("body-parser");
const port = 8000;
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/contactDance", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Define schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String,
});

const Contact = mongoose.model("contact", contactSchema);

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static")); // For serving static files
app.use(express.urlencoded({ extended: true }));

// PUG SPECIFIC STUFF
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

// ENDPOINTS
app.get("/", (req, res) => {
  const con =
    "This is the best content on the internet so far so use it wisely";
  const params = { title: "PubG is the best game", content: con };
  res.status(200).render("home.pug", params);
});
app.get("/contact", (req, res) => {
  const con =
    "This is the best content on the internet so far so use it wisely";
  const params = { title: "PubG is the best game", content: con };
  res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
  var myData = new Contact(req.body);
  myData
    .save()
    .then(() => {
      res.send("This item has been saved to the database");
    })
    .catch(() => {
      res.status(400).send("item was not saved to the databse");
    });
});
