const _ = require('lodash');

function InvalidUserException(message) {
    this.message = message;
    if ("captureStackTrace" in Error)
        Error.captureStackTrace(this, InvalidUserException);
    else
        this.stack = (new Error()).stack;
}
InvalidUserException.prototype = Object.create(Error.prototype);
InvalidUserException.prototype.name = "InvalidUserException";
InvalidUserException.prototype.constructor = InvalidUserException;

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          password:
 *            type: string
 *        example:
 *           name: Higor
 *           email: fake@email.com
 *           password: fake_password
 */

class User{
    constructor(object) {
            this.validate(object)
            this.id = object.id || ''
            this.name = object.name
            this.email = object.email
            this.password = object.password
    }

    validate(user){
        if (_.isEmpty(user.name))
            throw new InvalidUserException('Empty User Name')
        if (_.isEmpty(user.email))
            throw new InvalidUserException('Empty User Email')
        if (_.isEmpty(user.password))
            throw new InvalidUserException('Empty User Password')
    }
}


module.exports = {User}