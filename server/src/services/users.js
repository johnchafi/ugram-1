const logger = require('../common/logger');
const database = require('./database');

const fs = require('fs');

exports.addUserPicture = (userId, field, file, errorCallback, successCallback) => {
    fs.readFile(file.path, function (err, data) {
        if (err) return errorCallback(err);
        const s3bucket = new database.AWS.S3({params: {Bucket: database.bucketEndpoint }});
        const params = {
            Key: database.bucketRootUpload + "/" + userId + "/" + file.originalFilename,
            Body: data,
            ACL:'public-read',
            ContentType: 'image/jpeg',
        };
        s3bucket.upload(params, function (err, data) {
            if (err) return errorCallback(err);
            fs.unlink(file.path, function (err) {
                if (err) return errorCallback(err);
                logger.log('info', "[AWS S3] Temporary file " + file.path + ' deleted', {tags: 'services,addUserPicture'});
            });
            return successCallback(data.Location);
        });
    });
};

exports.deleteUserPicture = (userId, pictureName, errorCallback, successCallback) => {
    const s3bucket = new database.AWS.S3({params: {Bucket: database.bucketEndpoint }});
    const params = {
        Key: database.bucketRootUpload + "/" + userId + "/" + pictureName
    };
    s3bucket.deleteObject(params, function (err, data) {
        if (err) return errorCallback(err);
        logger.log('info', "[AWS S3] File " + params.Key + ' deleted', {tags: 'services,deleteUserPicture'});
        return successCallback();
    });
};
