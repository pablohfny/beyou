const {UserService} = require('../services/Services')

class UserController {
    constructor() {
    }

    static async getUser(object) {
        return await UserService.findUserByEmail(object);
    }
}

module.exports = UserController

  

