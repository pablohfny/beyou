const {User} = require('../models/Models');

class UserService {
    constructor() {
    }

    static async createUser(object) {
        return await User.create({
            name: object.name,
            email: object.email,
            password: object.password,
            isInstructor: false
        })
            .then((user) => {
                    return user;
                }
            ).catch((err) =>{
                throw err;
        })
    }
}

module.exports = UserService