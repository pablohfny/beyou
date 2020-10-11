const express = require('express');
const app = express();
module.exports = function (passport) {
    const {LoginController} = require('../../controllers/Controllers');
    LoginController(passport);
    /**
     * @swagger
     * tags:
     *   name: Login
     *   description: Login management
     */

    /**
     * @swagger
     * path:
     *  /login/local:
     *    post:
     *      summary: Login and authenticate user session
     *      tags: [Login]
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                  email:
     *                      type: string
     *                      description: The user email.
     *                  password:
     *                      type: string
     *                      description: The user password.
     *      responses:
     *        "204":
     *           description: User Authenticated.
     */
    app.post('/login/local', function (req, res, next) {
        passport.authenticate('local', function (err, user) {
            if (err)
                return res.status(400).send(err);

            req.logIn(user, function (error) {
                if (error)
                    res.status(400).send(error);

                return res.status(204).send();
            });
        })(req, res, next);
    });

    return app;
}