const CommentModel = require('../models/comment');
const auth = require('../services/auth');
const db = require('../services/database');
const Op = db.Sequelize.Op;
exports.getComments = (req, res, next) => {
    if (req.query['end'] && req.query['start']) {
        CommentModel.findAll({ where : {
                pictureId: {
                    [Op.gte]: parseInt(req.query['start']),
                    [Op.lte]: parseInt(req.query['end'])
                }
            },
            raw: true,
        }).then(comments => {
            return auth.sendSuccess(res, {items : comments}, 200);
        })
            .catch(err => {
                return auth.sendError(res, err, 400);
            });
    }
    else {
        CommentModel.findAll().then(comments => {
            return auth.sendSuccess(res, {items : comments}, 200);
        })
            .catch(err => {
                return auth.sendError(res, err, 400);
            });
    }
};


exports.getCommentsById = (req, res, next) => {
    CommentModel.find({ where : {
            id: req.params.id
        }}).then(comments => {
        return auth.sendSuccess(res, comments, 200);
    })
        .catch(err => {
            return auth.sendError(res, err, 400);
        });
};


