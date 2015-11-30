/// <reference path="../typings/node/node.d.ts" />
"use strict";

/**
 * Teste the tasks-mapper data access module, using CouchDb as the backend storage.
 * @type {exports|module.exports}
 */

let tasksGw = require('../tasks-mapper.js')
const expectedTasks = require("../db/all-tasks.json")
console.log("Global:" + JSON.stringify(expectedTasks))
const tasksScrit = require('../db/couchdb-tasks-script.js')

/**
 * Initializes the database with default data.
 * @param finish the callback that must be called when the setup is finished.
 */
exports.setUp = function(finish) {
	console.log("Setup: " + JSON.stringify(expectedTasks));
	tasksScrit.generate(finish)
}

exports.testTasksMapperGetAll = function(test) {
	console.log("testTasksMapperGetAll: " + JSON.stringify(expectedTasks));
	tasksGw.getAll((err, tasks) => {
		test.expect(0)
		console.log(expectedTasks)
		//test.deepEqual(tasks, expectedTasks)
		test.done()
	})		
}

exports.testTasksMapperGet = function(test) {
	tasksGw.get(1, (err, task) => {
		test.expect(1)
		test.deepEqual(task, expectedTasks[0])
		console.log(task)
		test.done()
	})		
}

const task =     {
	"description": "Listen music a lot",
	"dueDate": "eventually",
	"status": "UNSTARTED"
}

exports.testTasksMapperInsertAndGet = function(test) {
	tasksGw.insert(task, (err, id) => {
		test.expect(3)
		test.ifError(err)
		test.ok(id)
		task._id = id
		tasksGw.get(id, (err, t) =>{
			console.log(t)
			test.deepEqual(t, task)
			test.done()
		})
	})
}

exports.testTasksMapperTryDeleteUnfetchTask = function(test) {
	tasksGw.delete(7, (err, t) =>{
		test.expect(1)
		test.ok(err)
		console.log(err)
		test.done()				
	})
}

exports.testTasksMapperTryUpdateUnfetchTask = function(test) {
	tasksGw.update(7, (err, t) =>{
		test.expect(1)
		test.ok(err)
		console.log(err)
		test.done()				
	})
}


exports.testTasksMapperGetAndUpdate = function(test) {
	tasksGw.get(task._id, (err, t) =>{
		test.expect(4)
		console.log(t)
		test.deepEqual(t, task)
		task.status= 'FINISHED'
		tasksGw.update(task, err => {
			test.ifError(err)
			console.log('UPDATED')
			tasksGw.get(task._id, (err, tUpdated) =>{
				test.ifError(err)
				test.equal(tUpdated.status, 'FINISHED')
				test.done()
			})
		})				
	})
}


exports.testTasksMapperGetAndDelete = function(test) {
	tasksGw.get(task._id, (err, t) =>{
		test.expect(2)
		console.log(t)
		test.deepEqual(t, task)
		tasksGw.delete(task._id, err => {
			test.ifError(err)
			console.log('DELETED')
			test.done()
		})				
	})
}
