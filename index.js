const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./src/authRouter')
const corsMiddleware = require('./middleware/cors.Middleware')

const PORT = process.env.PORT || 5000
const db = 'database access'

const app = express()

app.use(corsMiddleware)
app.use(express.json())
app.use('/auth', authRouter)

const StartServer = async () => {
    try {
        await mongoose.connect(db)
        app.listen(PORT, () => console.log(`Сервер запущен по порту : ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
StartServer()
