const Router = require('express')
const router = new Router()
const authController = require('./authController')
const {check} = require('express-validator')

router.post('/registration',[
		check('username', 'Имя пользователя не может быть пустым').notEmpty(),
		check('password', 'Пароль пользователя не может быть меньше 6 символов').isLength({min: 6, max: 60}),
	], authController.registration)

router.post('/login',[
		check('username', 'Имя пользователя не может быть пустым').notEmpty(),
		check('password', 'Пароль пользователя не может быть меньше 6 символов').isLength({min: 6, max: 60}),
	], authController.login)

router.post('/create', authController.createTask)

router.post('/users', authController.getUsers)

module.exports = router