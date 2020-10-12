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

                if (!user.registrationConfirmed)
                    return done('Unconfirmed Registration, please check your email!', null);
                    
                return done(null, user);
            }).catch(err => {
                if (err) {
                    return done(err, null);
                }
            });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, {id: user.id, isPartner: user.isPartner});
    });

    passport.deserializeUser(function (user, done) {
        UserService.findUserById(user.id).then(user => {
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