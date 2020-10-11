const {UserService} = require('../services/Services')
const {compareSync} = require("bcrypt");
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

    passport.use(new LocalStrategy({
            usernameField: 'email'
        },
        function (username, password, done) {
            UserService.findUserByEmail(username).then(user => {
                if (!user || !compareSync(password, user.password))
                    return done('Incorrect username or password!', null);

                return done(null, user);
            }).catch(err => {
                if (err) {
                    return done(err, null);
                }
            });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, {id: user.id, isInstructor: user.isInstructor});
    });

    passport.deserializeUser(function (id, done) {
        UserService.findUserById(id).then(user => {
            if (!user)
                throw 'Unauthenticated user!';

            done(null, user);
        }).catch(err => {
            throw err;
        });
    });

    class LoginController {
        constructor() {
        }
    }

    return LoginController;
}