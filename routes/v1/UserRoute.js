const express = require('express');
const app = express();
const {UserController} = require('../../controllers/Controllers');
const {ensureAuthenticated} = require('../auth');

    /**
     * @swagger
     * tags:
     *   name: User
     *   description: User management
     */

    /**
     * @swagger
     * path:
     *  /users/:
     *    get:
     *      summary: Get authenticated user information
     *      tags: [Users]
     *      requestBody:
     *        required: false
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
    app.get('/users', 
    ensureAuthenticated,
    async function (req, res) {
        UserController.getUser(req.body).then(user => {

        }).catch(err => {
            res.status(400).send(err);
        })
    })

    module.exports = app;
