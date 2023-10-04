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

app.post("/submit", function(req, res) {
  res.locals.name = req.body.name;
  res.locals.languages = makeArray(req.body.language);
  res.locals.interests = makeArray(req.body.interest);

  const spend = calculateTimeSpending(req.body);
  res.locals.writing = spend.writing;
  res.locals.debugging = spend.debugging;
  res.locals.stackoverflow = spend.stackoverflow;
  console.log(generateTableData(req.body));
  res.locals.goals = generateTableData(req.body);

  res.render("survey");
});

// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

function makeArray(input) {
  if (input === undefined) {
      return [];
  }
  else if (Array.isArray(input)) {
      return input;
  }
  else {
      return [input];
  }
}

function calculateTimeSpending(data){
  const writing = parseFloat(data.writing);
  const debugging = parseFloat(data.debugging);
  const stackOverflow = parseFloat(data.stackoverflow);
  const totalTime = writing + debugging + stackOverflow;

  const spend = {
    writing : ((writing / totalTime) * 100).toFixed(2),
    debugging : ((debugging / totalTime) * 100).toFixed(2),
    stackoverflow : ((stackOverflow / totalTime) * 100).toFixed(2)
  }

  return spend;
}

function generateTableData(data) {
  const goals = [
  ];
  for(let i=0; i < data.goals.length; i++ ){
    if(!data.goals[i] &&  !data.goalsTime[i]){
      continue;
    }
    const goal = {
      goal : data.goals[i],
      time: data.goalsTime[i]
    }
    goals.push(goal);
  }
  return goals;
}
