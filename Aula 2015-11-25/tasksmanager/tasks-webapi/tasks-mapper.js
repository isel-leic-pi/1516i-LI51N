/// <reference path="typings/node/node.d.ts" />

"use strict";

const http = require('http')
const async = require('async')

function Options() {
	this.hostname = 'localhost'
	this.port = 5984
	this.method = 'GET'
	this.path = '/tasks'
}

/*
 * Keeps a copy of every tasks retrieved from the DB.
 */
const dbTasks = {}

//###################################################################
//##############        tasks-manager API      ######################
//###################################################################

/*
 * callback's decsriptor: (err, Task []) => void
 */
exports.getAll = function(callback){
	const opt = new Options()
	opt.path += '/_all_docs'
	const req = http.request(opt, resp => {
		respToJsonAndCallback(resp, toTaskList, callback)
	})
	req.end()
	req.on('error', callback)
}

/*
 * - id of the task
 * - callback's decsriptor: (err, Task) => void
 */
exports.get = function(id, callback){
	const opt = new Options()
	opt.path += '/' + id
	const req = http.request(opt, resp => {
		respToJsonAndCallback(resp, toTaskModel, callback)
	})
	req.end()
	req.on('error', callback)
}

/*
 * - callback's decsriptor: (err, taskId) => void
 */
exports.insert = function(task, callback){
	const opt = new Options()
	opt.method = 'POST'
	opt.headers = { 'Content-Type': 'application/json'}
	const req = http.request(opt, resp => {
		respToJsonAndCallback(resp, toTaskId, callback)
	})
	req.write(JSON.stringify(task))
	req.end()
	req.on('error', callback)
}

/*
 * - callback's descriptor: (err) => void
 */
exports.delete = function(id, callback){
	const t = dbTasks[id];
	if(!t) {
		callback(new Error('There is no task with given id or you must fetch that task before delete it.'))
		return
	}
	const opt = new Options()
	opt.path += '/' + id + '?rev=' + t._rev
	opt.method = 'DELETE'
	const req = http.request(opt, resp => {
		if(resp.statusCode == 200) callback()
		resp.on('error', callback)
	})
	req.end()
	req.on('error', callback)
}

/*
 * - callback's descriptor: (err) => void
 */
exports.update = function(task, callback){
	const t = dbTasks[task._id]
	if(!t) {
		callback(new Error('There is no task with given id or you must fetch that task before update it.'))
		return
	}
	const opt = new Options()
	opt.path += '/' + task._id + '?rev=' + t._rev
	opt.method = 'PUT'
	opt.headers = { 'Content-Type': 'application/json'}
	const req = http.request(opt, resp => {
		if(resp.statusCode == 201) callback()
		resp.on('error', callback)
	})
	req.write(JSON.stringify(task))
	req.end()
	req.on('error', callback)
}

//###################################################################
//##############        Auxiliary Functions      ####################
//###################################################################

/*
 * Converts the task object from CouchDB to a task object model and 
 * adds it to tasks array. 
 *     - dbTask - task object from database
 *     - response's decsriptor: (err, Task) => void
 */
function toTaskModel(dbTask, response) {
	const props = ['_id', 'description', 'dueDate', 'status']
	const dto = {}
	props.forEach(elem => dto[elem] = dbTask[elem])
	dbTasks[dbTask._id] = dbTask; 
	response(null, dto)
}

/*
 * - dbTaskList - a list of tasks identifiers from database
 * - response's decsriptor: (err, Task[]) => void
 */
function toTaskList(dbTaskList, response) {
	// requestTask is an array of functions
	const requestTask = dbTaskList.rows.map(elem => {
		return function(callback) {
			exports.get(elem.id, callback)
		}
	});
	async.series(requestTask, response)
}

/*
 * - objectId - as object with the id of the created task
 * - response's decsriptor: (err, id) => void
 */
function toTaskId(objectId, response) {
	response(null, objectId.id)
}

/*
 * - resp is a Readable stream
 * - converter - converts the database object to a domain object 
 * - callback's decsriptor: (err, Object) => void
 * 
 * Get all the data out of the stream and convert it to an
 * object and send it to the callback function.  
 */
function respToJsonAndCallback(resp, converter, callback) {
	let result = ""
	resp.on('data', buffer => {
		result += buffer.toString()
	})
	resp.on('end', buffer => {
		converter(JSON.parse(result), callback)
	})
	resp.on('error', err => {
		callback(err)
	})
}
