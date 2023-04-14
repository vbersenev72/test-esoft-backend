const { Schema, model } = require('mongoose')

const Task = new Schema({
    title: {type: String, required: true},
    des: {type: String, required: true},
    dateFinish: {type: String, required: true},
    dateCreate: {type: String, required: true},
    datePut: {type: String, required: true},
    priority: {type: String, required: true},
    status: {type: String, required: true},
    creator: {type: String, required: true},
})

module.exports = model('Task', Task)