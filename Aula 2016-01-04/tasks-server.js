
const http = require("http");
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const debug = require("debug")("tasks-server");
const hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials');



//const hbs = require("express-handlebars");

//debug("hbs %j", hbs);

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
app.get("/api/tasks/:id", tasksController.getTaskByIdApi);
app.post("/tasks/", tasksController.createTask);
app.post("/api/tasks/", tasksController.createTaskApi);
app.delete("/tasks/:id", tasksController.deleteTask);
app.delete("/api/tasks/:id", tasksController.deleteTaskApi);
app.put("/api/tasks/:id", tasksController.updateTaskApi);
app.get("/login", tasksController.login);





server.on("listening", listeningConnections);
server.listen(3005);


function listeningConnections() {
  const address = server.address();
  debug("opened server on %j", address);
}



