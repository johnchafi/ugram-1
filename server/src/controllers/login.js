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
                return auth.sendSuccess(res, {token : token.token}, 200);
            })
            .catch(err => {
                return auth.sendError(res, err, 400);
            });
    })
        .catch(err => {
            return auth.sendError(res, err, 400);
        });
};
