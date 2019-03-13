const service = require('../services/users');
const UserModel = require('../models/user');
const TokenModel = require('../models/token');
const PictureModel = require('../models/picture');

const uuidv4 = require('uuid/v4');
const formidable = require('formidable');
const path = require('path');

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
    const token = getToken(req);
    if (!token) {
        res.status(400);
        return res.send("Bearer token missing");
    }
    TokenModel.findOne({
        where: {
            token: token
        }
    }).then(token => {
        UserModel.findByPk(token.userId).then(user => {
            PictureModel.findAll({ 
                where: {
                    userId: user.id
                }
            }).then(pictures => {
                pictures.forEach(picture => {
                    PictureModel.formatToClient(picture);
                });
                res.status(200);
                return res.json(pictures);
            }).catch(err => {
                res.status(400);
                return res.send(err);
            });
        }).catch(err => {
            res.status(400);
            return res.send(err);
        });
    }).catch(err => {
        res.status(401);
        return res.send(err);
    });
};

// Uploads a picture for a user
exports.addUserPicture = (req, res, next) => {
    const token = getToken(req);
    if (!token) {
        res.status(400);
        return res.send("Bearer token missing");
    }
    TokenModel.findOne({
        where: {
            token: token
        }
    }).then(token => {
        UserModel.findByPk(token.userId).then(user => {
            new formidable.IncomingForm().parse(req, (err, fields, files) => {
                if (err) {
                    res.status(500);
                    return res.send(err);
                }
                if (files.file) {
                    const pictureModel = JSON.parse(fields.pictureModel);
                    const extension = path.extname(files.file.name);
                    PictureModel.create(
                    {
                        description : pictureModel.description,
                        extension : extension,
                        userId : user.id
                    })
                    .then(picture => {
                        files.file.name = picture.id + extension;
                        const errCallback = (err) => {
                            res.status(500);
                            return res.send(err);
                        }
                        const succCallback = (url) => {
                            console.log(url);
                            res.status(200);
                            return res.json({
                                id: picture.id
                            })        
                        }
                        service.addUserPicture(req.params.userId, fields, files.file, errCallback, succCallback);
                    })
                    .catch(err => {
                        res.status(500);
                        return res.send(err);
                    });
                } else {
                    res.status(400);
                    return res.send('File cannot be empty');    
                }
            });
        })
        .catch(err => {
            res.status(403);
            return res.send(err);
        });
    }).catch(err => {
        res.status(401);
        return res.send(err);
    });
};

// Gets a single picture
exports.getUserPicture = (req, res, next) => {
    const token = getToken(req);
    if (!token) {
        res.status(400);
        return res.send("Bearer token missing");
    }
    TokenModel.findOne({
        where: {
            token: token
        }
    }).then(token => {
        UserModel.findByPk(token.userId).then(user => {
            PictureModel.findByPk(req.params.pictureId).then(picture => {
                PictureModel.formatToClient(picture);
                res.status(200);
                return res.json(picture);
            }).catch(err => {
                res.status(400);
                return res.send(err);
            })
        })
        .catch(err => {
            res.status(403);
            return res.send(err);
        });
    }).catch(err => {
        res.status(401);
        return res.send(err);
    });
};

// Edits the fields of a picture for a user
exports.editUserPicture = (req, res, next) => {
    return res.send(service.editUserPicture(req.params.userId, req.params.pictureId, req.params.body));
};

// Deletes a picture for a user
exports.deleteUserPicture = (req, res, next) => {
    return res.send(service.deleteUserPicture(req.params.userId, req.params.pictureId));
};
