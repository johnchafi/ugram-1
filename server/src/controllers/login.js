const UserModel = require('../models/user');
const TokenModel = require('../models/token');
const auth = require('../services/auth');

exports.loginUser = (req, res, next) => {
    // Create the user
    UserModel.findOne({where: {
            email: req.body.email,
            password: req.body.password
        }}).then(user => {
        TokenModel.findOne({where: {
            userId: user.id,
        }})
        .then(token => {
            return auth.sendSuccess(res, {token : token.token, userId: user.id}, 200);
        })
        .catch(err => {
            return auth.sendError(res, "Cannot find user", 400);
        });
    })
    .catch(err => {
        return auth.sendError(res, "Cannot find user", 400);
    });
};

function createUser(user, res, token) {
    UserModel.create(
    {
        id: user.id,
        email : user.email,
        password : user.password,
        firstName : user.firstName,
        lastName : user.lastName,
        phoneNumber : user.phoneNumber,
        pictureUrl:  user.pictureUrl
    })
    .then(user => {
        console.log(user);
        TokenModel.create({
            userId : user.id,
            token: token
        })
            .then(token => {
                return auth.sendSuccess(res, {token : token.token, userId: user.id}, 200);
            })
            .catch(err => {
                return auth.sendError(res, err.errors[0].message, 400);
            });
    })
    .catch(err => {
        console.log(err.errors[0].path);
        if (err.errors[0].path === "password")
            err.errors[0].message = "Password cannot be null";
        if (err.errors[0].path === "PRIMARY")
            err.errors[0].message = "Pseudo is already use";
        if (err.errors[0].path === "email")
            err.errors[0].message = "Email must be unique";
        return auth.sendError(res, err.errors[0].message, 400);
    });
}


exports.loginUserGoogle = (req, res, next) => {
    TokenModel.findOne({where: {
        token: req.body.token,
    }})
    .then(token => {
        UserModel.findOne({where: {
                id: token.userId
            }}).then(user => {
            return auth.sendSuccess(res, {token : token.token, userId: user.id}, 200);
        })
    })
    .catch(err => {
        UserModel.findOne({where: {
                email: req.body.user.email,
            }}).then(user => {
            TokenModel.create({
                userId : user.id,
                token: req.body.token
            })
                .then(token => {
                    return auth.sendSuccess(res, {token : token.token, userId: user.id}, 200);
                })
                .catch(err => {
                    return auth.sendError(res, err.errors[0].message, 400);
                });
        }).catch(err => {
            return createUser(req.body.user, res, req.body.token);
        });
    });
};

exports.getUserToken = (req, res, next) => {
    // Create the user
    TokenModel.findOne({where: {
        token: req.body.token,
    }})
    .then(token => {
        UserModel.findOne({where: {
                id: token.userId
            }}).then(user => {
            return auth.sendSuccess(res, {token : token.token, userId: user.id}, 200);
        })
    })
    .catch(err => {
        return auth.sendError(res, err, 400);
    });
};
