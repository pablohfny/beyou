const express = require('express');
const app = express();
const {UserController} = require('../../controllers/Controllers');

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
     *                  name: Igor
     *                  email: fake@email.com
     *                  isPartner: false
     */
    app.post('/users', async function (req, res) {
        UserController.CreateUser(req.body).then(user => {
            res.status(201).send({id: user.id, name: user.name, email: user.email, isPartner: user.isInstructor});
        }).catch(err => {
            res.status(400).send(err);
        })
    })

    module.exports = app;
