const CommentModel = require('../models/comment');
const auth = require('../services/auth');
exports.getComments = (req, res, next) => {
    CommentModel.findAll().then(comments => {
        return auth.sendSuccess(res, comments, 200);
    })
        .catch(err => {
            return auth.sendError(res, err, 400);
        });
};
