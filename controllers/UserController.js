const {UserService} = require('../services/Services')

class UserController {
    constructor() {
    }

    static async CreateUser(object) {
        return UserService.createUser(object);
    }
}

module.exports = {UserController}