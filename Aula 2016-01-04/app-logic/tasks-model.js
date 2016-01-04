'use strict';

/**
 * 
 * @type {*[]}
 */

var tasks = [
    {
        "_id": "1",
        "description": "Learn HTTP",
        "dueDate": "yesterday",
        "status": "DONE"
    },
    {
        "_id": "2",
        "description": "Swimming",
        "dueDate": "never",
        "status": "PROGRESS"
    },
    {
        "_id": "3",
        "description": "Have fun",
        "dueDate": "never",
        "status": "PROGRESS"
    },
    {
        "_id": "4",
        "description": "Climb Everest",
        "dueDate": "someday",
        "status": "TODO"
    }
];

let taskId = 5;


function Task(description, status, dueDate) {
    this.description = description;
    this.dueDate = dueDate;
    this.status = status;
}

function getTasks(tasksCb) {
    tasksCb(null, tasks);
}

function getTaskById(id, cb) {
    console.log("getTaskById: ", tasks.find);
    cb(null, tasks.find( t => t._id == id));
}

function deleteTask(req, rsp) {
    rsp.end("delete Task with id " + req.query.id);
    debug("delete /tasks with id %s", req.params.id);
}

function createTask(task, cb) {
    tasks.push(task);
    task._id = taskId++;
    cb(null, task);
}

module.exports = {
    Task: Task,
    getTasks: getTasks,
    getTaskById: getTaskById,
    deleteTask: deleteTask,
    createTask: createTask
};

