const express = require('express');
const app = express();
const {UserController} = require('../../controllers/Controllers')

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
app.post('/users', function (req, res) {
    let user = UserController
    res.status(204).json('Hello World!')
})

module.exports = app