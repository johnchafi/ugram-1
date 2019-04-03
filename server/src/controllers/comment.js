const CommentModel = require('../models/comment');
const auth = require('../services/auth');
const io = require('../../index').io;
exports.getComments = (req, res, next) => {
    CommentModel.findAll().then(comments => {
        return auth.sendSuccess(res, comments, 200);
    })
        .catch(err => {
            return auth.sendError(res, err, 400);
        });
};


exports.addComment = (req, res, next) => {
    let socket = req.app.get('socket');
    CommentModel.create(
        {
            userId: req.body.userId,
            pictureId : req.body.pictureId,
            message : req.body.message
        })
        .then(comment => {
            socket.emit('GET_COMMENTS');
            return auth.sendSuccess(res, {comment}, 200);
        })
        .catch(err => {
            return auth.sendError(res, err.errors[0].message, 400);
        });
};
