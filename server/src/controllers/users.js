const service = require('../services/users');
const pagination = require('../services/pagination');
const auth = require('../services/auth');

const UserModel = require('../models/user');
const TokenModel = require('../models/token');
const PictureModel = require('../models/picture');
const TagModel = require('../models/tag');
const MentionModel = require('../models/mention');

const multiparty = require('multiparty');
const path = require('path');

// Gets all the users
exports.getUsers = (req, res, next) => {
    UserModel.findAll().then(users => {
        users.forEach(user => {
            UserModel.formatToClient(user);
        })
        return auth.sendSuccess(
            res,
            pagination.formatPagination(users, req.query.page, req.query.perPage),
            200
        );
    });
};

// Gets a specific user
exports.getUser = (req, res, next) => {
    UserModel.findByPk(req.params.userId).then(user => {
        UserModel.formatToClient(user);
        return auth.sendSuccess(res, user, 200);
    }).catch(err => {
        return auth.sendError(res, "User '" + req.params.userId + "' does not exist.", 400)
    });
};

// Edits the fields of a specific user
exports.editUser = (req, res, next) => {
    auth.isAuthenticated(req).then(user => {
        user.update({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber
        }).then(() => {
            return auth.sendSuccess(res, { message: "User updated"}, 201);
        })
        .catch(err => {
            return auth.sendError(res, err, 500);
        });
    }).catch(err => {
        return auth.sendError(res, err.message, err.code);
    });
};


exports.createUser = (req, res, next) => {
    // Create the user
    UserModel.create(
    {
        id: req.body.id,
        email : req.body.email,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        phoneNumber : req.body.phoneNumber
    })
    .then(user => {
        console.log(user);
        TokenModel.create({
            userId : user.id,
            token: auth.generateToken()
        })
        .then(token => {
            return auth.sendSuccess(res, {token : token.token}, 201);
        })
        .catch(err => {
            return auth.sendError(res, err.errors[0].message, 400);
        });
    })
    .catch(err => {
        console.log(err.errors[0].path);
        if (err.errors[0].path === "password")
            err.errors[0].message = "Missing field 'password'";
        if (err.errors[0].path === "PRIMARY")
            err.errors[0].message = "Id is already taken";
        if (err.errors[0].path === "email")
            err.errors[0].message = "Email is already taken";
        return auth.sendError(res, err.errors[0].message, 400);
    });
};

exports.deleteUser = (req, res, next) => {
    auth.isAuthenticated(req).then(user => {
        return user.destroy();
    })
    .then(() => {
        return auth.sendSuccess(res, null, 200);
    })
    .catch(err => {
        return auth.sendError(res, err, 401);
    });
};

// Gets the pictures of a user
exports.getUserPictures = (req, res, next) => {
    UserModel.findByPk(req.params.userId).then(user => {
        if (user === null) {
            return auth.sendError(res, "User '" + req.params.userId + "' does not exist.", 400)
        } else {
            PictureModel.findAll({
                where: {
                    userId: req.params.userId
                },
                order: [
                    ['createdDate', 'DESC']
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
                        return auth.sendSuccess(
                            res,
                            pagination.formatPagination(pictures, req.query.page, req.query.perPage),
                            200
                        );
                    }).catch(err => {
                        return auth.sendError(res, err, 400);
                    });
                }).catch(err => {
                    return auth.sendError(res, err, 400);
                });
            }).catch(err => {
                return auth.sendError(res, err, 400);
            })
        }
    }).catch(err => {
        return auth.sendError(res, "User '" + req.params.userId + "' does not exist.", 400)
    });
};

// Uploads a picture for a user
exports.addUserPicture = (req, res, next) => {
    auth.isAuthenticated(req).then(user => {
        var form = new multiparty.Form();

        form.parse(req, function(err, fields, files) {
            if (files.file) {
                const extension = path.extname(files.file[0].originalFilename);
                PictureModel.create({
                    description : fields.description[0],
                    extension : extension,
                    userId : user.id,
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
                                return auth.sendError(res, 'Cannot upload file', 500);
                            }
                            const succCallback = (url) => {
                                return auth.sendSuccess(res, {id: picture.id}, 200);
                            }
                            service.addUserPicture(req.params.userId, fields, files.file[0], errCallback, succCallback);
                        }).catch(err => {
                            return auth.sendError(res, 'Cannot insert mentions', 500);
                        })
                    }).catch(err => {
                        return auth.sendError(res, 'Cannot insert tags', 500);
                    });
                })
                .catch(err => {
                    return auth.sendError(res, err, 500);
                });
            } else {
                return auth.sendError(res, 'No file provided', 400);
            }
        });
    })
    .catch(err => {
        return auth.sendError(res, err.message, err.code);
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
                return auth.sendSuccess(res, picture, 200);
            }).catch(err => {
                return auth.sendError(res, err, 400);
            })
        }).catch(err => {
            return auth.sendError(res, err, 400);
        });
    }).catch(err => {
        return auth.sendError(res, err, 400);
    })
};

// Edits the fields of a picture for a user
exports.editUserPicture = (req, res, next) => {
    auth.isAuthenticated(req).then(user => {
        PictureModel.update(
            {
                description : req.body.description
            },
            {
                where: {
                    id: req.params.pictureId
                }
            }
        )
        .then(() => {
            PictureModel.findByPk(req.params.pictureId).then(picture => {
                let tags = [];
                req.body.tags.forEach(tag => {
                    tags.push({ value: tag, pictureId: picture.id });
                })
                TagModel.destroy({
                    where: {
                        pictureId: picture.id
                    }
                }).then(() => {
                    TagModel.bulkCreate(tags).then(tags => {
                        let mentions = [];
                        req.body.mentions.forEach(mention => {
                            mentions.push({ userId: mention, pictureId: picture.id });
                        })
                        MentionModel.destroy({
                            where : {
                                pictureId: picture.id
                            }
                        }).then(() => {
                            MentionModel.bulkCreate(mentions).then(mentions => {
                                PictureModel.formatToClient(picture, mentions, tags);
                                return auth.sendSuccess(res, picture, 200);
                            }).catch(err => {
                                return auth.sendError(res, err, 500);
                            })
                        }).catch(err => {
                            return auth.sendError(res, err, 500);
                        });
                    }).catch(err => {
                        return auth.sendError(res, err, 500);
                    });
                }).catch(err => {
                    return auth.sendError(res, err, 500);
                });
            }).catch(err => {
                return auth.sendError(res, err, 500);
            });
        })
        .catch(err => {
            return auth.sendError(res, err, 500);
        });
    }).catch(err => {
        return auth.sendError(res, err, 401);
    });
};

// Deletes a picture for a user
exports.deleteUserPicture = (req, res, next) => {
    auth.isAuthenticated(req).then(user => {
        PictureModel.findByPk(req.params.pictureId).then(picture => {
            const errCallback = (err) => {
                return auth.sendError(res, 'Unable to delete the specified file', 401);
            };
            const succCallback = () => {
                PictureModel.destroy({
                    where: {
                        id: picture.id
                    }
                }).then(() => {
                    return auth.sendSuccess(res, null, 200);
                })
                .catch(err => {
                    return auth.sendError(res, err, 500);
                });
            };
            service.deleteUserPicture(picture.userId, picture.id + picture.extension, errCallback, succCallback);
        }).catch(err => {
            return auth.sendError(res, err, 400);
        })
    }).catch(err => {
        console.log(err);
        return auth.sendError(res, err, 401);
    });
};
