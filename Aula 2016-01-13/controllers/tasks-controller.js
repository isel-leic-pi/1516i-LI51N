'use strict';

const debug = require("debug")("tasks-controller");

const tasksModel = require("../app-logic/tasks-model");


function getTasks(req, rsp) {
    debug("/tasks called");
    tasksModel.getTasks((err, tasks) => {
        //rsp.setHeader("Content-Type", "application/json");

        //rsp.end(JSON.stringify(tasks));
        //rsp.setHeader("Content-Type", "text/csv");
        rsp.render("tasks", {title: "Tasks List", tasks: tasks, user: req.user })
    });
}

function getTaskById(req, rsp) {
    rsp.end("Task with id " + req.params.id);

}

function getTaskByIdApi(req, rsp) {
    debug("/tasks with id " + req.params.id);
    tasksModel.getTaskById(req.params.id, (err, task) => {
        task.layout = false;
        rsp.render("partials/task", task);
    });

}

function deleteTask(req, rsp) {
    rsp.end("delete Task with id " + req.query.id);
    debug("delete /tasks with id %s", req.params.id);
}

function deleteTaskApi(req, rsp) {
    rsp.end(JSON.stringify({id: req.params.id}));
    debug("delete /tasks with id %s", req.params.id);
}

function updateTaskApi(req, rsp) {
    rsp.end("update Task with id " + req.params.status);
    debug("update /tasks with id %s", req.params.status);
}

function createTask(req, rsp) {
    var body = req.body;
    tasksModel.createTask(new tasksModel.Task(body.description, body.status, body.duedate), taskCreated);

    function taskCreated(err, task) {
        rsp.redirect("/tasks");
    }

    debug("create /tasks with id %s", JSON.stringify(req.body));

}

function createTaskApi(req, rsp) {
    var body = req.body;
    tasksModel.createTask(new tasksModel.Task(body.description, body.status, body.duedate), taskCreated);

    function taskCreated(err, task) {
        debug("created /api/tasks with id %j", task);
        task.layout = false;
        rsp.render("partials/task", task)
    }

    debug("create /api/tasks with id %s", JSON.stringify(req.body));

}



var express = require('express');
var routerPages = express.Router();
var routerApi = express.Router();


const ROUTE_PATHES = {
    ROOT_PATH: "/",
    TASK_DETAILS_PATH: "/:id"
};





routerPages.get(ROUTE_PATHES.ROOT_PATH, getTasks);
routerPages.get(ROUTE_PATHES.TASK_DETAILS_PATH, getTaskById);
routerPages.delete("/:id", deleteTask);
routerPages.post("/", createTask);


routerApi.post(ROUTE_PATHES.ROOT_PATH, createTaskApi);
routerApi.get(ROUTE_PATHES.TASK_DETAILS_PATH, getTaskByIdApi);
routerApi.delete("/:id", deleteTaskApi);
routerApi.put("/:id", updateTaskApi);

module.exports = {
    pages: routerPages,
    api: routerApi
};