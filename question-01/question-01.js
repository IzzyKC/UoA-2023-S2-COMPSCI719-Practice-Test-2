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

// Setup body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Make the "public" folder available statically
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// When navigating to "/", render home.handlebars
app.get("/", function (req, res) {
  res.render("home");
});

// YOU CAN CREATE YOU HANDLER FUNCTION HERE

// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
