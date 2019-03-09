const logger = require('../common/logger')
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const UserModel = require('../models/user');

exports.getUsers = () => {
    return UserModel.get(function(err, data) {
            if (err) {
                console.log("Error [" + err + "]");
                return null;
            } else {
                return data;
            }

    });
}

exports.getUser = (userId) => {
    return {userId: userId};
}

exports.editUser = (userId, user) => {
    return {userId: userId};
}

exports.getUserPictures = (userId) => {
    return {userId: userId};
}

exports.addUserPicture = (userId, picture) => {
    const bucketName = 'glo3102-sample';
    const keyName = 'hello_world.txt';
    const params = {
        Bucket: bucketName,
        Key: keyName,
        Body: body
    };
    logger.info(`Uploading file "${keyName}" to bucket "${bucketName}" with body "${body}"`);
    return s3.putObject(params).promise();
}

exports.getUserPicture = (userId, pictureId) => {
    return {userId: userId};
};

exports.editUserPicture = (userId, pictureId, picture) => {
    return {userId: userId};
};

exports.deleteUserPicture = (userId, pictureId) => {
    return 'OK';
};