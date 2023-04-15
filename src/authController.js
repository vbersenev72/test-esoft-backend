const Task = require('../models/Task');
const User = require('../models/User');
const bcrypt = require('bcryptjs')

class authController {
    async registration(req, res) {
        try {
            const {name, lastname, username, password} = req.body
            const candidate = await User.findOne({username}) // попытка найти пользователя с таким юзернеймом

            if (candidate) { // если нашли =>
                return res.status(400).json({message: 'Пользователь с таким ником уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7); // если не нашли - захешировали пароль

            const user = new User({name, lastname, username, password: hashPassword}) // создали пользователя в соответствии со схемой

            await user.save() // сохранили пользователя в бд
            res.json({message: 'Пользователь успешно зарегистрирован'})

        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'registration error'})
        }
    }

    async login(req, res) {
        try {

        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'login error'})
        }
    }

    async getUsers(req, res) {
        try {


            res.json('server work')
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'error'})
        }
    }
}

module.exports = new authController()