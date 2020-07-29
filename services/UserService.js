const {User} = require('../models/User')
const {UserRepository} = require('../repositories/User')


function createUser(object) {
    try {
        let newUser = new User(object);
    } catch (e) {

    }
}