const swaggerJSDoc = require('swagger-jsdoc');
//const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const fs = require('fs');
const AWS = require('aws-sdk');
const path = require("path");

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
    let s3 = new AWS.S3();
    let params = {Bucket: 'ugram-team02', Key: 'index.html'};
    s3.getObject(params, function(err, data) {
        res.setHeader('Content-Type', 'text/html');
        res.send(data.Body);
    });
}
