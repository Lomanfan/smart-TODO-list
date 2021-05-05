// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect(() => {
  console.log('database connected');
});

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const todoRoutes = require("./routes/todo");
//require the route from database.js
const database = require('./routes/database');
const apiRoutes = require('./routes/apiRoute');
//require method-override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/api/users", usersRoutes(db));
app.use("/users", usersRoutes(database));
// app.use("/api/todo", todoRoutes(db));
// app.use("/api", apiRoutes(database));
// Note: mount other resources here, using the same pattern above

// login
app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  // const templateVars = {user_id: 1,user_name:'Anne Parks'}
  // res.render("index", templateVars);
  const user = {user_id: 1,user_name:'Anne Parks'};
    // console.log(user)
     database.getTodo(user)
      .then(data => {
        const userTodoLists = data;
        console.dir(userTodoLists);
        res.render("index",{userTodoLists});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
});

//homepage
// app.get("/urls", (req, res) => {
//   const urlsByUser = urlsForUser(req.session.user_id, urlDatabase);
//   const templateVars = { urls: urlsByUser, user_id: users[req.session.user_id]};
//   res.render("urls_index", templateVars);
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
