const Router = require('express')
const router = new Router()
const authController = require('./authController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/registration',[
		check('username', 'Имя пользователя не может быть пустым').notEmpty(),
		check('password', 'Пароль пользователя не может быть меньше 6 символов').isLength({min: 6, max: 60}),
	], authController.registration)

router.post('/login',[
		check('username', 'Имя пользователя не может быть пустым').notEmpty(),
		check('password', 'Пароль пользователя не может быть меньше 6 символов').isLength({min: 6, max: 60}),
	], authController.login)

router.post('/create', authController.createTask)

router.post('/auth', authMiddleware, authController.auth)

router.post('/users', authController.getUsers)
router.post('/tasks', authController.getTasks)
router.post('/delete', authController.deleteTask)
router.post('/update', authController.updateTask)
router.post('/gettask', authController.getTaskById)


router.post('/tasksuser', authController.getTasksUser)

module.exports = router