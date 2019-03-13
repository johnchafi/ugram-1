const service = require('../services/users');
const UserModel = require('../models/user');
const TokenModel = require('../models/token');
const uuidv4 = require('uuid/v4');
const formidable = require('formidable')
const fs = require('fs');

function getToken(req) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }
    return token;
}

// Gets all the users
exports.getUsers = (req, res, next) => {
    UserModel.findAll().then(users => {
        res.json(users)
    });
};

// Gets a specific user
exports.getUser = (req, res, next) => {
    UserModel.findByPk(req.params.userId).then(user => {
        return res.json(user);
    });
};

// Edits the fields of a specific user
exports.editUser = (req, res, next) => {
    const token = getToken(req);
    if (!token) {
        res.status(401);
        return res.send("Bearer token missing");
    }
    TokenModel.findOne({
        where: {
            token: token
        }
    }).then(token => {
        UserModel.findByPk(token.userId).then(user => {
            user.update({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber
            }).then(() => {
                res.status(200);
                res.send();
            })
            .catch(err => {
                res.status(500);
                res.send(err);
            });
        })
        .catch(err => {
            res.status(401);
            return res.send(err);
        });
    }).catch(err => {
        res.status(401);
        return res.send(err);
    });
};

exports.createUser = (req, res, next) => {
    // Create the user
    UserModel.create(
    {
        id: req.body.id,
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        phoneNumber : req.body.phoneNumber
    })
    .then(user => {
        TokenModel.create({
            userId : user.id,
            token: uuidv4()
        })
        .then(() => {
            res.status(201);
            return res.send("Created");
        })
        .catch(err => {
            res.status(400);
            return res.send(err);
        });
    })
    .catch(err => {
        res.status(400);
        return res.send(err);
    });
};

exports.deleteUser = (req, res, next) => {
    const token = getToken(req);
    if (!token) {
        res.status(401);
        return res.send("Bearer token missing");
    }
    TokenModel.findOne({
        where: {
            token: token
        }
    }).then(token => {
        UserModel.findByPk(token.userId).then(user => {
            return user.destroy();
        })
        .then(() => {
            res.status(200);
            return res.send();
        })
        .catch(err => {
            res.status(403);
            return res.send(err);
        });
    }).catch(err => {
        res.status(400);
        return res.send(err);
    });
};

// Gets the pictures of a user
exports.getUserPictures = (req, res, next) => {
    return res.send(service.getUserPictures(req.params.userId));
};

// Uploads a picture for a user
exports.addUserPicture = (req, res, next) => {
    new formidable.IncomingForm().parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error', err);
            throw err
        }
        let file  = files.file;
        service.addUserPicture(req.params.userId, fields, file, res);
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
