const logger = require('../common/logger');
const database = require('./database');

const PictureModel = require('../models/picture');

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

exports.uploadFile = (s3bucket, picture, dataFile, basename, uploadsRemaining, errorCallback, doneCallback) => {
    const params = {
        Key: database.bucketRootUpload + "/" + picture.dataValues.userId + "/" + basename,
        Body: dataFile,
        ACL:'public-read',
        ContentType: 'image/jpeg',
    };
    s3bucket.upload(params, function (err, data) {
        if (err) return errorCallback(err);
        doneCallback();
    });
};

exports.addUserPicture = (picture, file, field, errorCallback, successCallback) => {
    fs.readFile(file.path, (err, data) => {
        if (err) return errorCallback(err);
        const s3bucket = new database.AWS.S3({params: {Bucket: database.bucketEndpoint }});
        const originalFilenames = PictureModel.formatUrlBySizes(picture);
        let uploadsRemaining = Object.keys(originalFilenames).length;
        const doneCallback = () => {
            uploadsRemaining -= 1;
            if (uploadsRemaining <= 0) {
                fs.unlink(file.path, function (err) {
                    if (err) return errorCallback(err);
                    logger.log('info', "[AWS S3] Temporary file " + file.path + ' deleted', {tags: 'services,addUserPicture'});
                });
                return successCallback(data.Location);
            }
        };
        Object.keys(originalFilenames).forEach((size) => {
            if (size === "original") {
                this.uploadFile(s3bucket, picture, data, path.basename(originalFilenames[size]),
                    uploadsRemaining, errorCallback, doneCallback);
            } else {
                const realSize = parseInt(size, 10);
                sharp(data).resize(realSize, realSize).toBuffer().then(dataResized => {
                    this.uploadFile(s3bucket, picture, dataResized, path.basename(originalFilenames[size]), 
                        uploadsRemaining, errorCallback, doneCallback);
                }).catch(err => {
                    return errorCallback(err);
                });    
            }
        });
    });
};

exports.deleteUserPicture = (picture, errorCallback, successCallback) => {
    const s3bucket = new database.AWS.S3({params: {Bucket: database.bucketEndpoint }});
    const originalFilenames = PictureModel.formatUrlBySizes(picture);
    let keyArray = [];
    Object.keys(originalFilenames).forEach((size) => {
        keyArray.push(
            {
                Key: database.bucketRootUpload + "/" + picture.dataValues.userId + "/" + path.basename(originalFilenames[size])
            }
        );
    });
    const params = {
        Delete: {
            Objects: keyArray
        }
    };
    s3bucket.deleteObjects(params, function (err, data) {
        if (err) return errorCallback(err);
        logger.log('info', "[AWS S3] File for user " + picture.userId + ' deleted', {tags: 'services,deleteUserPicture'});
        return successCallback();
    });
};

exports.deleteUserPictures = (pictures, errorCallback, successCallback) => {
    const s3bucket = new database.AWS.S3({params: {Bucket: database.bucketEndpoint }});
    let keyArray = [];
    pictures.forEach(picture => {
        const originalFilenames = PictureModel.formatUrlBySizes(picture);
        Object.keys(originalFilenames).forEach((size) => {
            keyArray.push(
                {
                    Key: database.bucketRootUpload + "/" + picture.dataValues.userId + "/" + path.basename(originalFilenames[size])
                }
            );
        });
    });
    const params = {
        Delete: {
            Objects: keyArray
        }
    };
    s3bucket.deleteObjects(params, function (err, data) {
        if (err) return errorCallback(err);
        if (pictures.length > 0)
            logger.log('info', "[AWS S3] Files for user " + pictures[0].userId + ' deleted', {tags: 'services,deleteUserPictures'});
        else
            logger.log('info', "[AWS S3] Files for user deleted", {tags: 'services,deleteUserPictures'});
        return successCallback();
    });
};