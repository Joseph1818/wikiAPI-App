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

// Chainable route handlers for a route path using app.route()(Reduces redundancy & specified at a single location).

app
  .route("/articles")
  .get(function (req, res) {
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
  })
  .post(function (req, res) {
    console.log();
    console.log();

    //Creating data inside.
    const ArticleData = new Article({
      tile: res.body.title,
      content: res.body.content,
    });
    ArticleData.save(function (err) {
      if (!err) {
        res.send("Successfuly added a new article.");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function (req, res) {
    //Delete data methods.
    ArticleData.deleteMany(
      ("/articles",
      function (req, res) {
        if (!err) {
          res.send("Deleted succesfully");
        } else {
          res.send(err);
        }
      })
    );
  });

//GET ROUT Methods, this methodes get all items in the articles model and print it.
// app.get("/articles", function (req, res) {
//   Article.find(function (err, foundArticles) {
//     // To print it on browser using console log.
//     // console.log(foundArticles);
//     // To print it on browser using res.send
//     if (!err) {
//       res.send(foundArticles);
//     } else {
//       res.send(err);
//     }
//   });
// });

// POST ROUT Methods.
// app.post("/articles", function (req, res) {
//   console.log();
//   console.log();

//   //Creating data inside.
//   const ArticleData = new Article({
//     tile: res.body.title,
//     content: res.body.content,
//   });
//   ArticleData.save(function (err) {
//     if (!err) {
//       res.send("Successfuly added a new article.");
//     } else {
//       res.send(err);
//     }
//   });
// });

// DELETE Methods
// app.delete("/articles", function (req, res) {
//   //Delete data methods.
//   ArticleData.deleteMany(
//     ("/articles",
//     function (req, res) {
//       if (!err) {
//         res.send("Deleted succesfully");
//       } else {
//         res.send(err);
//       }
//     })
//   );
// });

app.listen(3000, function () {
  console.log("Server started succesfully on port 3000");
});
