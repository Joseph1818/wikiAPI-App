const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

// creating schema

const articleSchema = {
  title: String,
  content: String,
};
//Creating model
const Article = mongoose.model("Article", articleSchema);

// connecting to mongodb connections
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1/wikiDB", { useNewUrlParser: true });
//TODO

app.listen(3000, function () {
  console.log("Server started succesfully on port 3000");
});