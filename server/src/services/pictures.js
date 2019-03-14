const logger = require('../common/logger')
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const PictureModel = require('../models/picture');
const TagModel = require('../models/tag');
const MentionModel = require('../models/mention');


exports.getPictures = () => {
}
