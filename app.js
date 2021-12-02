const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
require("dotenv").config();

const app = express();
const port = 3000;

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.x9zzv.mongodb.net/node-blog-site?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("connected to the database");
    console.log(process.env.DB_USER, process.env.DB_PWD);
    app.listen(port, (req, res) => {
      console.log(`Listening for requests at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", "ejsViews");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
