const Task = require('../models/Task');
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require('./config')
const authMiddleware = require('../middleware/auth.middleware')

const generateAccessToken = (id) => {
    const payload = {id}
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) { // регистрирует ползователя
        try {
            const errors = validationResult(req.body) // Валидируем ошибки в запросе
            if (!errors.isEmpty()) { // Если есть то =>
                return res.status(400).json({message: "Ошибка при регистрации", error: errors})
            }

            const {name, lastname, username, password} = req.body
            const candidate = await User.findOne({username}) // попытка найти пользователя с таким юзернеймом

            if (candidate) { // если нашли =>
                return res.status(400).json({message: 'Пользователь с таким ником уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7); // если не нашли - захешировали пароль

            const user = new User({name, lastname, username, password: hashPassword}) // создали пользователя в соответствии со схемой

            await user.save() // сохранили пользователя в бд
            res.json({message: 'Пользователь успешно зарегистрирован, войдите', response: user})

        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'registration error'})
        }
    }

    async login(req, res) { // возвращает jwt-токен
        try {

            const {username, password} = req.body
            const candidate = await User.findOne({username}) // ищем юзера в базе
            if (!candidate) { // если не нашли
                return res.status(400).json({message: `Пользователь ${candidate} не найден`})
            }

            const validPassword = bcrypt.compareSync(password, candidate.password) // сравниваем введенный пароль с хешем внутри базы данных

            if (!validPassword) {
                return res.status(400).json({message: "Пароль неверный"}) //если пароль неверный
            }

            const token = generateAccessToken(candidate._id) // токен содержит в себе id юзера
            return res.json({token, candidate})

        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'login error'})
        }
    }

    async auth(req, res) {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, secret, {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)

        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'error'})
        }
    }

    async getTasks(req, res) {
        try {
            const tasks = await Task.find()
            res.json(tasks)
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'error'})
        }
    }

    async createTask(req, res) {
        try {
            const {title, des, dateFinish, dateCreate, datePut, priority, status, token, holder} = req.body

            const creatorId = jwt.verify(token, secret)
            console.log(creatorId)
            const userCreator = await User.findById(creatorId.id)

            const creator = userCreator.username
            console.log(creator);

            const task = new Task({title, des, dateFinish, dateCreate, datePut, priority, status, creator, holder})
            await task.save()

            res.json({message: 'Задача сохранена'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'create task error'})
        }
    }

    async getTasksUser(req, res) {
        try {
            const {token} = req.body
            if(!token){
                return res.status(401).json({message: 'not found jwt token'})
            }

            const decodeToken = jwt.verify(token, secret)
            console.log(decodeToken)

            const {username} = await User.find({_id: decodeToken.id}) // ищем пользователя в базе
            const tasks = await Task.find({username}) // ищем таски для определенного пользователя
            res.json(tasks)
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'error get tasks'})
        }
    }


    async deleteTask(req, res) {
        try {
            const {_id} = req.body
            await Task.deleteOne({_id})
            res.json({message: 'Задача удалена'})
        } catch (error) {
            res.status(400).json({message: 'delete task error'})
        }
    }
}

module.exports = new authController()