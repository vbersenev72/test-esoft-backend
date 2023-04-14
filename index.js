const express = require('express')
const mongoose = require('mongoose')

const PORT = 5000
const db = 'mongodb+srv://root:root@cluster0.nlikgpa.mongodb.net/test'

const app = express()

const StartServer = async () => {
    try {
        await mongoose.connect(db)
        app.listen(PORT, () => console.log(`Сервер запущен по порту : ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
StartServer()
