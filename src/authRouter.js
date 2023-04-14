const Router = require('express')
const router = new Router()
const authController = require('./authController')

router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.post('/users', authController.getUsers)

module.exports = router