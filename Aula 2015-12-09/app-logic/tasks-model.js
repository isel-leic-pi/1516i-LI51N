
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
    }
];

function getTasks(tasksCb) {
    tasksCb(null, tasks);
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

