const {UserService} = require('../services/Services')
let userService = new UserService();

class UserController{
    static CreateUser(object){
        userService.createUser(object);
    }
}
