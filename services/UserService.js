const {User} = require('../models/Models');

class UserService {
    constructor() {
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