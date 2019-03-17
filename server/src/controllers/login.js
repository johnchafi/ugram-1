const UserModel = require('../models/user');
const TokenModel = require('../models/token');
const auth = require('../services/auth');
exports.loginUser = (req, res, next) => {
    console.log(req.body);
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

exports.getUserToken = (req, res, next) => {
    console.log(req.body);
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
