const PictureModel = require('../models/picture');
const TagModel = require('../models/tag');
const MentionModel = require('../models/mention');

const pagination = require('../services/pagination');
const auth = require('../services/auth');
const db = require('../services/database');
const Op = db.Sequelize.Op;

// Gets all pictures with a specific tag
exports.getPicturesByTag = (req, res) => {
    TagModel.findAll({
        where : {
            value: {
                [Op.like]: req.query.tag
            }
        }
    }).then(tags => {
        let ids = [];
        tags.forEach(tag => {
            ids.push(tag.pictureId);
        });
        PictureModel.findAll({
            where: {
                id : ids
            },
            order: [
                [ 'created' , 'DESC']
            ]
        }).then(pictures => {
            PictureModel.assignPicturesDetails(pictures).then(pictures => {
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
    });
}

// Gets all pictures paginated
exports.getAllPictures = (req, res, next) => {
    PictureModel.findAll({
        order: [
            [ 'created' , 'DESC']
        ]
    }).then(pictures => {
        PictureModel.assignPicturesDetails(pictures).then(pictures => {
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
}

//Gets the pictures ordered by creation date
exports.getPictures = (req, res, next) => {
    if (req.query.tag !== undefined && req.query.tag !== "") {
        this.getPicturesByTag(req, res);
    } else {
        this.getAllPictures(req, res);
    }
};
