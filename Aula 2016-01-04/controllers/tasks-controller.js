'use strict';

const debug = require("debug")("tasks-controller");

const tasksModel = require("../app-logic/tasks-model");


function getTasks(req, rsp) {
    debug("/tasks called");
    tasksModel.getTasks((err, tasks) => {
        //rsp.setHeader("Content-Type", "application/json");

        //rsp.end(JSON.stringify(tasks));
        //rsp.setHeader("Content-Type", "text/csv");
        rsp.render("tasks", {title: "Tasks List", tasks: tasks })
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

function login(req, rsp) {
    rsp.render("login");

}


module.exports = {
    getTasks: getTasks,
    getTaskById: getTaskById,
    deleteTask: deleteTask,
    createTask: createTask,
    login: login,
    // API methods
    createTaskApi: createTaskApi,
    deleteTaskApi: deleteTaskApi,
    updateTaskApi: updateTaskApi,
    getTaskByIdApi: getTaskByIdApi
};
