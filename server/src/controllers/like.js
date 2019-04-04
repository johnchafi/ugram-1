const LikeModel = require('../models/like');
const auth = require('../services/auth');
exports.getLikes = (req, res, next) => {
    LikeModel.findAll().then(comments => {
        return auth.sendSuccess(res, comments, 200);
    })
        .catch(err => {
            return auth.sendError(res, err, 400);
        });
};
