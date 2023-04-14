const { Schema, model } = require('mongoose')

const User = new Schema({
    name: String,
    lastname: String,
    username: String,
    password: String,
    tasks: [{type: Object, ref: "task"}]
})

module.exports = model('User', User)