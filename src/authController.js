const Task = require('../models/Task');
const User = require('../models/User');

class authController {
    async registration(req, res) {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    async login(req, res) {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    async getUsers(req, res) {
        try {
            const userTasks = new Task()
            const user = new User()

            await user.save({
                name: 'req.body.name'
            })

            // await userTasks.save({
            //     title: 'test task',
            //     des: 'test task description',
            //     dateFinish: 'datafinish',
            //     dateCreate:'datacreate',
            //     datePut: 'date put',
            //     priority: 'high',
            //     status: 'complete',
            //     creator: 'username',
            // })
            res.json('server work')
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new authController()