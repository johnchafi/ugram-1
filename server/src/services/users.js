const logger = require('../common/logger')
const AWS = require('aws-sdk');
const database = require('../models/database');
const UserModel = require('../models/user');
const fs = require('fs');

AWS.config.update({
    accessKeyId: "AKIAIRCQYVHQV4RN5RKA",
    secretAccessKey: "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"
});

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

exports.addUserPicture = (userId, field, file, errorCallback, successCallback) => {

    fs.readFile(file.path, function (err, data) {
        if (err) return errorCallback(err);
        const s3bucket = new AWS.S3({params: {Bucket: database.bucketEndpoint }});
        const params = {
            Key: database.bucketRootUpload + "/" + userId + "/" + file.name,
            Body: data,
            ACL:'public-read',
            ContentType: 'image/jpeg',
        };
        s3bucket.upload(params, function (err, data) {
            if (err) return errorCallback(err);
            fs.unlink(file.path, function (err) {
                if (err) return errorCallback(err);
                console.log('Temp file deleted');
            });
            return successCallback(data.Location);
        });
    });
};

exports.getUserPicture = (userId, pictureId) => {
    return {userId: userId};
};

exports.editUserPicture = (userId, pictureId, picture) => {
    return {userId: userId};
};

exports.deleteUserPicture = (userId, pictureId) => {
    return 'OK';
};
