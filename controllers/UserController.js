const {UserService} = require('../services/Services')

class UserController {
    constructor() {
    }

    static async CreateUser(object) {
        return await UserService.createUser(object);
    }
}

module.exports = UserController