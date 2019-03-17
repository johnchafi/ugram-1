const swaggerJSDoc = require('swagger-jsdoc');
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const auth = require('../services/auth');
const fs = require('fs');

const swaggerHost = 'http://ugram-team02.pm9h7ckh7u.us-east-2.elasticbeanstalk.com'
const swaggerBasePath = '/';

exports.getInfo = (req, res, next) => {
    const swaggerDefinition = {
        basePath: swaggerBasePath,
        host: swaggerHost,
        info: {
            description: 'Api for Ugram project',
            title: 'UGRAM API',
            version: '1.0.0',
        },
    };
    const options = {
        apis: ['./src/routes/*.js'],
        swaggerDefinition,
    };
    const swaggerSpec = swaggerJSDoc(options);
    
    return auth.sendSuccess(res, swaggerSpec, 200);
};

exports.get = (req, res, next) => {
    const indexContent = fs.readFileSync(`${pathToSwaggerUi}/index.html`).toString().
        replace('https://petstore.swagger.io/v2/swagger.json',
            swaggerHost + (swaggerBasePath === '/' ? '' : swaggerBasePath) + '/info');
    return res.send(indexContent);
}
