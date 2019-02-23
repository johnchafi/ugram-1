const logger = require('../common/logger')
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.getPictures = () => {
    return 'This is a sample';
}