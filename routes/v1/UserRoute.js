const express = require('express');
const app = express();
const {UserController, passport} = require('../../controllers/Controllers')

app.use(passport.initialize({}));
app.use(passport.session({}));

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
app.post('/users/login/local',
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true }, function(req, res){
        res.status(204);
    }));
module.exports = app