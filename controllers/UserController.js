const {UserService} = require('../services/Services')
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function (username, password, done) {
        UserService.findUserByEmail(username).then(user => {
            if (!user || !user.verifyPassword(password))
                throw 'Incorrect username or password.';

            return done(null, user);
        }).catch(err => {
            if (err) {
                return done(err);
            }
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    UserService.findUserById(id).then(user => {
        if (!user)
            throw 'Unauthenticated user!';

        done(null, user);
    }).catch(err => {
        return done(err);
    });
});


class UserController {
    constructor() {
    }

    static async CreateUser(object) {
        return await UserService.createUser(object);
    }
}

module.exports = {UserController, passport}