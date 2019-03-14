const service = require('../services/users');
const UserModel = require('../models/user');
const TokenModel = require('../models/token');
const PictureModel = require('../models/picture');
const TagModel = require('../models/tag');
const MentionModel = require('../models/mention');

const multiparty = require('multiparty');
const uuidv4 = require('uuid/v4');
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
    PictureModel.findAll({ 
        where: {
            userId: req.params.userId
        },
        order: [
            ['id', 'ASC']
        ]
    }).then(pictures => {
        let ids = [];
        pictures.forEach(picture => {
            ids.push(picture.id);
        });
        TagModel.findAll({
            where: {
                pictureId: ids
            },
            order: [
                ['id', 'ASC']
            ]
        }).then(tags => {
            MentionModel.findAll({
                where: {
                    pictureId: ids
                },
                order: [
                    ['id', 'ASC']
                ]
            }).then(mentions => {
                pictures.forEach(picture => {
                    let finalTags = [];
                    tags.forEach(tag => {
                        if (tag.pictureId == picture.id) {
                            finalTags.push(tag);
                        }
                    });
                    let finalMentions = [];
                    mentions.forEach(mention => {
                        if (mention.pictureId == picture.id) {
                            finalMentions.push(mention);
                        }
                    });
                    PictureModel.formatToClient(picture, finalMentions, finalTags);
                })
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
        res.status(400);
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
            var form = new multiparty.Form();

            form.parse(req, function(err, fields, files) {
                if (files.file) {
                    const extension = path.extname(files.file[0].originalFilename);
                    PictureModel.create({
                        description : fields.description[0],
                        extension : extension,
                        userId : user.id
                    })
                    .then(picture => {
                        let tags = [];
                        fields.tags.forEach(tag => {
                            const nestedTags = tag.split(",");
                            nestedTags.forEach(nestedTag => {
                                tags.push({ value: nestedTag, pictureId: picture.id });
                            });                          
                        })
                        TagModel.bulkCreate(tags).then(tags => {
                            let mentions = [];
                            fields.mentions.forEach(mention => {
                                const nestedMentions = mention.split(",");
                                nestedMentions.forEach(nestedMention => {
                                    mentions.push({ userId: nestedMention, pictureId: picture.id });
                                });
                            })
                            MentionModel.bulkCreate(mentions).then(mentions => {
                                files.file[0].originalFilename = picture.id + extension;
                                const errCallback = (err) => {
                                    res.status(500);
                                    return res.send('Cannot upload file');
                                }
                                const succCallback = (url) => {
                                    console.log(url);
                                    res.status(200);
                                    return res.json({
                                        id: picture.id
                                    })        
                                }
                                service.addUserPicture(req.params.userId, fields, files.file[0], errCallback, succCallback);
                            }).catch(err => {
                                res.status(500);
                                console.log(err);
                                return res.send('Cannot insert mentions');
                            })
                        }).catch(err => {
                            res.status(500);
                            return res.send('Cannot insert tags');
                        });
                    })
                    .catch(err => {
                        res.status(500);
                        return res.send(err);
                    });
                } else {
                    res.status(400);
                    return res.send('No file provided');
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
    PictureModel.findByPk(req.params.pictureId).then(picture => {
        MentionModel.findAll({
            where: {
                pictureId: picture.id
            }
        }).then(mentions => {
            TagModel.findAll({
                where: {
                    pictureId: picture.id
                }
            }).then(tags => {
                PictureModel.formatToClient(picture, mentions, tags);
                res.status(200);
                return res.json(picture);
            }).catch(err => {
                res.status(400);
                return res.send(err);    
            })
        }).catch(err => {
            res.status(400);
            return res.send(err);
        });
    }).catch(err => {
        res.status(400);
        return res.send(err);
    })
};

// Edits the fields of a picture for a user
exports.editUserPicture = (req, res, next) => {
    return res.send(service.editUserPicture(req.params.userId, req.params.pictureId, req.params.body));
};

// Deletes a picture for a user
exports.deleteUserPicture = (req, res, next) => {
    return res.send(service.deleteUserPicture(req.params.userId, req.params.pictureId));
};
