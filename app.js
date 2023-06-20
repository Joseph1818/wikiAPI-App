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

//GET ROUT, this methodes get all items in the articles model and print it.

app.get("/articles", function (req, res) {
  Article.find(function (err, foundArticles) {
    // To print it on browser using console log.
    // console.log(foundArticles);
    // To print it on browser using res.send
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
});

// POST ROUTE
app.post("/articles", function (req, res) {
  console.log();
  console.log();

  //Creating data inside. Mogodb database
  const ArticleData = new Article({
    tile: res.body.title,
    content: res.body.content,
  });
  ArticleData.save(function(err){
    if (!err) {
        res.send("Successfuly added a new article.");
    } else {
        res.send(err);
    }
  });
});

app.listen(3000, function () {
  console.log("Server started succesfully on port 3000");
});
