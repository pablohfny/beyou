const {User} = require('../models/Models')

class UserService {
    constructor() {
    }

    createUser(object) {
        User.create({name: object.name, email: object.email, password: object.password, isInstructor: false})
            .then((user) => {
                    return {User: user, err: null}
                }
            ).catch((err) => {
            return {User: null, err}
        })
    }
}

module.exports = {UserService}