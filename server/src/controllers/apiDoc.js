const { Router } = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const fs = require('fs');


class apiDoc {
    constructor() {
        const swaggerDefinition = {
            basePath: '/',
            host: 'localhost:1337',
            info: {
                description: 'Api for ugram project',
                title: 'UGRAM API',
                version: '1.0.0',
            },
        };
        const options = {
            apis: ['./src/controllers/*.js'],
            swaggerDefinition,
        };
        this.router = Router();
        this.routes();
        this.swaggerSpec = swaggerJSDoc(options);
        this.indexContent = fs.readFileSync(`${pathToSwaggerUi}/index.html`).toString().replace('https://petstore.swagger.io/v2/swagger.json', 'http://localhost:1337/info');
    }

    routes() {
        this.router.get('/info', this.swaggerJSON.bind(this));
        this.router.get('/', (req, res) => res.send(this.indexContent));
    }

    /**
     * @swagger
     * /info:
     *   get:
     *     tags:
     *       - api documentation json
     *     description: Get api documentation route information
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: All Api Doc informations
     */

    swaggerJSON(req, res, next) {
        try {
            res.setHeader('Content-Type', 'application/json');
            res.send(this.swaggerSpec);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = apiDoc;
