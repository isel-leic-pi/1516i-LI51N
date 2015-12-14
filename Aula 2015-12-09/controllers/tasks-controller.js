
const debug = require("debug")("tasks-controller");

const tasksModel = require("../app-logic/tasks-model");


function getTasks(req, rsp) {
    debug("/tasks called");
    tasksModel.getTasks((err, tasks) => {
        rsp.setHeader("Content-Type", "application/json");
       rsp.end(JSON.stringify(tasks));
    });
}

function getTaskById(req, rsp) {
    rsp.end("Task with id " + req.params.id);
    debug("/tasks with id");

}

function deleteTask(req, rsp) {
    rsp.end("delete Task with id " + req.query.id);
    debug("delete /tasks with id %s", req.params.id);
}

function createTask(req, rsp) {
    rsp.end("delete Task with id " + req.query.id);
    debug("delete /tasks with id %s", req.params.id);

}

module.exports = {
    getTasks: getTasks,
    getTaskById: getTaskById,
    deleteTask: deleteTask,
    createTask: createTask
};
