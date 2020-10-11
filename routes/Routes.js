const express = require('express')
const router = express.Router()
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

module.exports = function (passport) {
    const options = {
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: "BeYou Swagger",
                version: "1.0.0",
                contact: {
                    name: "Pablo",
                    email: "pablohfny@gmail.com"
                }
            },
            servers: [
                {
                    url: "https://localhost:3000/api/v1"
                }
            ]
        },
        apis: ["./models/*", "./routes/v1/*"]
    };

    const swaggerSpec = swaggerJSDoc(options);
    router.use('/v1/docs', swaggerUi.serve);
    router.get('/v1/docs', swaggerUi.setup(swaggerSpec, {explorer: true}));

    router.use('/v1', require('./v1/LoginRoute')(passport));
    router.use('/v1', require('./v1/PartnerRoute'));
    router.use('/v1', require('./v1/UserRoute'));

    return router;
}