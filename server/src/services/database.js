const logger = require('../common/logger');

const AWS = require('aws-sdk');
const winston = require('winston');
const winstonCloudWatch = require('winston-cloudwatch');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
winston.add(winstonCloudWatch, {
    logGroupName: 'kleinh',
    logStreamName: 'team02-api',
});

AWS.config.update({
    accessKeyId: process.env.access_key_upload,
    secretAccessKey: process.env.secret_access_key_upload
});

const sequelize = new Sequelize(process.env.db_name, process.env.db_user , process.env.db_password, {
    host: process.env.db_host,
    dialect: 'mysql',
    operatorsAliases: false,
});

sequelize.authenticate()
.then(() => {
    logger.log('info', "[STARTUP] Connected to DB", {tags: 'startup,SQL'});
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
