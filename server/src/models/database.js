const Sequelize = require('sequelize');
const logger = require('../common/logger');
const sequelize = new Sequelize('ugram', 'ugram', 'azertyuiop', {
    host: 'ugram.cxwi9docu0jq.us-east-2.rds.amazonaws.com',
    dialect: 'mysql',
    operatorsAliases: false,
});
sequelize
    .authenticate()
    .then(() => {
        logger.log('info', "[STARTUP] Connecting to DB...", {tags: 'startup,SQL'});
    })
    .catch(err => {
        logger.log('error', "[ERROR_DB] Cannot connect to DB....", {tags: 'error,SQL'});
    });

const db = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    bucketEndpoint: 'elasticbeanstalk-us-east-2-374725152443',
    bucketDomain: 's3.amazonaws.com',
    bucketRootUpload: 'uploads'
};

module.exports = db;
