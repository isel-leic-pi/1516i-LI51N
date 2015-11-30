"use strict";

/**
 * Initializes the CouchDB /tasks database with default data present in
 * all-tasks.json.
 */
const http = require("http");

/**
 * The default data tasks.
 */
const tasks = require("./all-tasks.json");


/**
 * Constructor function to create option instances needed for HTTP
 * requests through http module.
 * @param path the uri PATH for the request, if omitted the default value
 * /tasks.
 * @param m
 * @constructor
 */
function Options(path, m) {
    this.hostname = 'localhost'
    this.port = 5984
    this.method = m || 'PUT'
    this.path = path || '/tasks'
}

/*
 * Starts script
 */

/**
 * Keeps the callback to be called when all data is inserted in the database
 */
var finishHandler

/**
 * Module entry point, that initializes all database clean setup
 * (drop database and insert fresh data)
 * @param finish callback to be called when database is ready to be used.
 */
exports.generate = function(finish){
    finishHandler = finish
    dropDB()
}

/**
 * Drops the database and when done as the next step calls createDB.
 */
function dropDB() {
    heading('Dropping database Tasks...')
    request(new Options(undefined, 'DELETE'), undefined, createDB)
}
/*
 * Create the database and, when completed with suceess (HTTP status code 200),
 * inserts the tasks as the next step.
 */
function createDB() {
    heading('Creating database Tasks...')
    request(new Options(), undefined, insertTask, 200)
}
/*
 * Inserts the default tasks in the database. When done invokes the
 * finishHandler callback, to indicate all initialization is done.
 *
 * <div>
 * <strong>Remarks:</strong>
 * In reality, this function does insert the task at the top od the tasks
 * default data, if exists, and then defines a call to this same function
 * as its nest step. If the tasks array is empty, calls the finish callback.
 * </div>
 */
function insertTask() {
    const t = tasks.pop()

    if(t){
        heading('Creating Task ' + t._id)
        request(
            new Options('/tasks/' + t._id), 
            JSON.stringify(t),
            insertTask,
            200
        )
    } else finishHandler()
}

/**
 * Auxiliary function to make an HTTP request.
 * @param options
 * @param body
 * @param nextStep
 * @param status
 */
function request(options, body, nextStep, status) {
    const req = http.request(options,
        createProcessResponse(nextStep, status));
    if(body) req.write(body);
    req.end();
    req.on('error', e => console.log('ERROR on request:\n' + e.message));
}

function createProcessResponse(nextStep, status) {
    return (res) => {
        console.log('STATUS: ' + res.statusCode);
            
        res.on('error', err => console.log('ERROR on response:\n' + err))
        res.on('data', data => console.log('DATA:\n' + data.toString()))
        
        if(!status)
            nextStep()
        else if(res.statusCode == status)
            nextStep()
    }
}



//////////////////// Module auxiliary functions ////////////////////////

function heading(msg) {
    console.log('##########################################')
    console.log(msg)
}
