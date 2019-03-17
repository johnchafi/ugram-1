const swaggerJSDoc = require('swagger-jsdoc');
//const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const fs = require('fs');

exports.getInfo = (req, res, next) => {
    const swaggerDefinition = {
        basePath: '/latest',
        host: 'pxpxqxb9ub.execute-api.us-east-2.amazonaws.com',
        info: {
            description: 'Api for ugram project',
            title: 'UGRAM API',
            version: '1.0.0',
        },
    };
    const options = {
        apis: ['./src/routes/*.js'],
        swaggerDefinition,
    };
    const swaggerSpec = swaggerJSDoc(options);

    try {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    } catch (err) {
        next(err);
    }
};

exports.get = (req, res, next) => {
    const indexContent = fs.readFileSync(`http://ugram-team02.s3-website.ca-central-1.amazonaws.com/index.html`).toString();
    res.send(indexContent);
}
