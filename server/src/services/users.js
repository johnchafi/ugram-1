const logger = require('../common/logger')
const AWS = require('aws-sdk');
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

exports.addUserPicture = (userId, field, file, res) => {

    fs.readFile(file.path, function (err, data) {
        if (err) throw err; // Something went wrong!
        let s3bucket = new AWS.S3({params: {Bucket: 'elasticbeanstalk-us-east-2-374725152443'}});
        /** @TODO generer l'id de la photo par rapport a l'id du champs dans la table.
         * @TODO l'option field possede tout les champs dans un post d'image : description tags mentions.
         * */
        s3bucket.createBucket(function () {
            let params = {
                Key: "uploads/" + userId + "/" + file.name,
                Body: data,
                ACL:'public-read',
                ContentType: 'image/jpeg'
            };
            s3bucket.upload(params, function (err, data) {
                // Whether there is an error or not, delete the temp file
                fs.unlink(file.path, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    console.log('Temp File Delete');
                });

                console.log("PRINT FILE:", file);
                if (err) {
                    console.log('ERROR MSG: ', err);
                    res.status(500).send(err);
                } else {
                    res.json({id: data.Location});
                    res.status(200).end();
                }
            });
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
