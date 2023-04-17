const { Schema, model } = require('mongoose')

const Task = new Schema({
    title:  String,
    des:  String,
    dateFinish:  String,
    dateCreate:  String,
    datePut:  String,
    priority:  String,
    status:  String,
    creator: String,
    holder: String
})

module.exports = model('Task', Task)