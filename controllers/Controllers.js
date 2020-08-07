module.exports = function (passport){
    const UserController = require('./UserController')(passport);


    return {UserController}
}