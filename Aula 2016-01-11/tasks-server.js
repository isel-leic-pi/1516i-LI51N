
const http = require("http");

const express = require("express");
const path = require('path');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const debug = require("debug")("tasks-server");
const hbs = require('hbs');
var layouts = require('handlebars-layouts');

const passport = require("passport");
var session = require('express-session')

// Register helpers
hbs.registerHelper(layouts(hbs.handlebars));
hbs.registerPartials(__dirname + '/views/partials');





//debug("hbs %j", hbs);

// register the View Helpers
require("./helpers/view/view-helpers")();

const tasksController = require("./controllers/tasks-controller");
const users = require("./controllers/users-controller");
const tasks = require("./controllers/tasks-controller");

const app = express();

const server = http.createServer(app);

app.set('view engine', 'hbs');
hbs.localsAsTemplateData(app);

app.use("/", express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'slb 4 ever' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// Configure routing
app.use("/", users);
app.use("/tasks", tasks.pages);
app.use("/api/tasks", tasks.api);


app.use(function(req, rsp, next) {
  debug("Current user %j", req.user)
  debug("Flash %j", req.flash('error'))
  next();
})



server.on("listening", listeningConnections);
server.listen(3005);


function listeningConnections() {
  const address = server.address();
  debug("opened server on %j", address);
}



