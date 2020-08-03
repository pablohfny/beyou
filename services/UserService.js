const {User} = require('../models/Models')

class UserService {
    constructor() {
    }

    static async createUser(object) {
        User.create({name: object.name, email: object.email, password: object.password, isInstructor: false})
            .then((user) => {
                    return user;
                }
            ).catch((err)=>
            {
                console.log(err);
                throw err;
            }
        )
    }
}

module.exports = {UserService}