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

    static async findUserByEmail(email) {
        return await User.findOne({ where: { email: email }})
            .then((user) => {
                    return user || null;
                }
            ).catch((err) =>{
                throw err;
            })
    }

    static async findUserById(id) {
        return await User.findOne({ where: { id: id }})
            .then((user) => {
                    return user || null;
                }
            ).catch((err) =>{
                throw err;
            })
    }


}

module.exports = UserService