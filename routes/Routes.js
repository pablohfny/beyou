const express = require('express')
const router = express.Router()
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

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
                url: "http://localhost:3000/api/v1"
            }
        ]
    },
    apis: ["./models/*", "./routes/v1/*"]
};
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
router.use('/v1/docs', swaggerUi.serve);
router.get('/v1/docs', swaggerUi.setup(swaggerSpec, { explorer: true }));




router.use('/v1', require('./v1/userRoute'));




module.exports = router