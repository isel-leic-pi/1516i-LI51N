
const http = require("http");
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const debug = require("debug")("tasks-server");


const hbs = require("express-handlebars");

debug("hbs %j", hbs);

// register the View Helpers
require("./helpers/view/view-helpers")();

const tasksController = require("./controllers/tasks-controller");

const app = express();

const server = http.createServer(app);

app.set('view engine', 'hbs');

app.use("/", express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));


// Configure routing
app.get("/tasks", tasksController.getTasks);
app.get("/tasks/:id", tasksController.getTaskById);
app.post("/tasks/", tasksController.createTask);
app.delete("/tasks/:id", tasksController.deleteTask);





server.on("listening", listeningConnections);
server.listen(3000);


function listeningConnections() {
  const address = server.address();
  debug("opened server on %j", address);
}

