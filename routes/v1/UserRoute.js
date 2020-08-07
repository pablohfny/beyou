const express = require('express');
const app = express();
module.exports = function (passport) {
    const {UserController} = require('../../controllers/Controllers')(passport);

    /**
     * @swagger
     * tags:
     *   name: Users
     *   description: User management
     */

    /**
     * @swagger
     * path:
     *  /users/:
     *    post:
     *      summary: Create a new user
     *      tags: [Users]
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/User'
     *      responses:
     *        "200":
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  id:
     *                      type: string
     *                      description: The user UUID.
     *                  name:
     *                      type: string
     *                      description: The user name.
     *                  email:
     *                      type: string
     *                      description: The user email.
     *                example:
     *                  id: 4c4c4aeb-53a1-44ef-bfaf-b2779bd7a887
     *                  name: Higor
     *                  email: fake@email.com
     */
    app.post('/users', async function (req, res) {
        UserController.CreateUser(req.body).then(user => {
            res.status(201).send({id: user.id, name: user.name, email: user.email});
        }).catch(err => {
            res.status(400).send(err);
        })
    })

    /**
     * @swagger
     * path:
     *  /users/login/local:
     *    post:
     *      summary: Login and authenticate user session
     *      tags: [Users]
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
    app.post('/users/login/local', function (req, res, next) {
        passport.authenticate('local', function (err, user) {
            if (err)
                res.status(400).send(err);

            req.logIn(user, function (error) {
                if (error)
                    res.status(400).send(error);

                console.log('Inside req.login() callback')
                console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
                console.log(`req.user: ${JSON.stringify(req.user)}`)

                return res.status(204).send();
            });
        })(req, res, next);
    });

    return app;
}