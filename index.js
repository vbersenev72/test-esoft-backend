const express = require('express')
const mongoose = require('mongoose')

const PORT = 5000
const db = 'mongodb://127.0.0.1:27017/2222?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0'

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
