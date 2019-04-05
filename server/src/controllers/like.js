const LikeModel = require('../models/like');
const auth = require('../services/auth');
const db = require('../services/database');
const Op = db.Sequelize.Op;
exports.getLikes = (req, res, next) => {
    if (req.query['end'] && req.query['start']) {
        LikeModel.findAll({ where : {
                pictureId: {
                    [Op.gte]: parseInt(req.query['start']),
                    [Op.lte]: parseInt(req.query['end'])
                }
            },
            raw: true,
        }).then(likes => {
            return auth.sendSuccess(res, {items : likes}, 200);
        })
            .catch(err => {
                return auth.sendError(res, err, 400);
            });
    }
    else {
        LikeModel.findAll().then(likes => {
            return auth.sendSuccess(res, {items : likes}, 200);
        })
            .catch(err => {
                return auth.sendError(res, err, 400);
            });
    }
};

exports.getLikeById = (req, res, next) => {
    LikeModel.find({ where : {
            id: req.params.id
        }}).then(comments => {
        return auth.sendSuccess(res, comments, 200);
    })
        .catch(err => {
            return auth.sendError(res, err, 400);
        });
};
