const express = require('express');
const app = express();
const {RegistrationController} = require('../../controllers/Controllers');


    /**
     * @swagger
     * tags:
     *   name: Registration
     *   description: Registration management
     */

    /**
     * @swagger
     * path:
     *  /registration/partners:
     *    post:
     *      summary: Create a new Partner
     *      tags: [Registration]
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
     *                      description: The partner UUID.
     *                  name:
     *                      type: string
     *                      description: The partner name.
     *                  email:
     *                      type: string
     *                      description: The partner email.
     *                example:
     *                  id: 4c4c4aeb-53a1-44ef-bfaf-b2779bd7a887
     *                  name: Igor
     *                  email: fake@email.com
     *                  isPartner: true
     */
    app.post('/registration/partners', async function (req, res) {
        RegistrationController.createPartner(req.body).then(user => {
            res.status(201).send({id: user.id, name: user.name, email: user.email, isPartner: user.isPartner});
        }).catch(err => {
            res.status(400).send(err);
        })
    });


    /**
     * @swagger
     * path:
     *  /registration/users:
     *    post:
     *      summary: Create a new user
     *      tags: [Registration]
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
    app.post('/registration/users', async function (req, res) {
        RegistrationController.createUser(req.body).then(user => {
            res.status(201).send({id: user.id, name: user.name, email: user.email, isPartner: user.isPartner});
        }).catch(err => {
            res.status(400).send(err);
        })
    });


    /**
     * @swagger
     * path:
     *  /registration/confirmation:
     *    post:
     *      summary: Confirm user/partner registration
     *      tags: [Registration]
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                    type: string
     *                    description: The user/partner UUID.
     *                hash:
     *                    type: string
     *                    description: Registration Hash.
     *      responses:
     *        "204":
     *          description: Registration confirmed with success.
     */
    app.post('/registration/confirm/:confirmationHash', async function (req, res) {
        RegistrationController.validateRegistration(req.params.confirmationHash).then(user => {
            res.status(204).send();
        }).catch(err => {
            res.status(400).send(err);
        })
    });
    
    module.exports = app;
