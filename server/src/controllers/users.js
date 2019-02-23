const service = require('../services/users');

//  Gets all the users
exports.getUsers = (req, res, next) => {
    return res.send(service.getUsers());
};

// Gets a specific user
exports.getUser = (req, res, next) => {
    return res.send(service.getUser(req.params.userId));
};

// Edits the fields of a specific user
exports.editUser = (req, res, next) => {
    return res.send(service.editUser(req.params.userId, req.params.body));
};

// Gets the pictures of a user
exports.getUserPictures = (req, res, next) => {
    return res.send(service.getUserPictures(req.params.userId));
};

// Uploads a picture for a user
exports.addUserPicture = (req, res, next) => {
    const response = service.addUserPicture(req.params.userId, req.params.body).then(function(data) {
        return res.send('Upload successful');
    }).catch(function(err) {
        console.log(err);
        res.status(500).send('An error occured');
    });
};

// Gets a single picture
exports.getUserPicture = (req, res, next) => {
    return res.send(service.getUserPicture(req.params.userId, req.params.pictureId));
};

// Edits the fields of a picture for a user
exports.editUserPicture = (req, res, next) => {
    return res.send(service.editUserPicture(req.params.userId, req.params.pictureId, req.params.body));
};

// Deletes a picture for a user
exports.deleteUserPicture = (req, res, next) => {
    return res.send(service.deleteUserPicture(req.params.userId, req.params.pictureId));
};