// Setup Express
const express = require("express");
const app = express();
const port = 3000;

// Setup Handlebars
const handlebars = require("express-handlebars");
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");

// Setup fs
const fs = require("fs");

// Setup body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Setup multer (files will temporarily be saved in the "temp" folder).
const path = require("path");
const multer = require("multer");
const upload = multer({
  dest: path.join(__dirname, "temp"),
});

// Make the "public" folder available statically
app.use(express.static(path.join(__dirname, "public")));

// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
