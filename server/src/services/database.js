const logger = require('../common/logger');

const AWS = require('aws-sdk');
const winston = require('winston');
const winstonCloudWatch = require('winston-cloudwatch');
const Sequelize = require('sequelize');

winston.add(winstonCloudWatch, {
    logGroupName: 'kleinh',
    logStreamName: 'team02-api',
});

AWS.config.update({
    accessKeyId: "AKIAIRCQYVHQV4RN5RKA",
    secretAccessKey: "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"
});

const sequelize = new Sequelize('ugram', 'ugram', 'azertyuiop', {
    host: 'ugram.cxwi9docu0jq.us-east-2.rds.amazonaws.com',
    dialect: 'mysql',
    operatorsAliases: false,
});

sequelize.authenticate()
.then(() => {
    logger.log('info', "[STARTUP] Connecting to DB...", {tags: 'startup,SQL'});
})
.catch(err => {
    logger.log('error', "[ERROR_DB] Cannot connect to DB....", {tags: 'error,SQL'});
});

const db = {
    AWS: AWS,
    Sequelize: Sequelize,
    sequelize: sequelize,
    bucketEndpoint: 'elasticbeanstalk-us-east-2-374725152443',
    bucketDomain: 's3.amazonaws.com',
    bucketRootUpload: 'uploads'
};

module.exports = db;
