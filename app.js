const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "ejsViews");

app.listen(port, (req, res) => {
  console.log(`Listening for requests at http://localhost:${port}`);
});

app.use(morgan("dev"));

app.get("/", (req, res) => {
  const blogs = [
    { title: "First blog", snippet: "Topic of the first blog" },
    { title: "Second blog", snippet: "Topic of the second blog" },
    { title: "Third blog", snippet: "Topic of the third blog" },
  ];
  res.render("index", { title: "Home", blogs: blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
