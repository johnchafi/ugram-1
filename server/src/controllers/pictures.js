const PictureModel = require('../models/picture');
const TagModel = require('../models/tag');
const MentionModel = require('../models/mention');

const pagination = require('../services/pagination');
const auth = require('../services/auth');
const db = require('../services/database');
const Op = db.Sequelize.Op;

function assignDetails(req, res, pictures) {
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
}

//Gets the pictures ordered by creation date
exports.getPictures = (req, res, next) => {
    if (req.query.tag !== undefined && req.query.tag !== "") {
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
                return assignDetails(req, res, pictures);
            }).catch(err => {
                return auth.sendError(res, err, 400);
            });
        }).catch(err => {
            return auth.sendError(res, err, 400);
        });
    } else {
        PictureModel.findAll({
            order: [
                [ 'created' , 'DESC']
            ]
        }).then(pictures => {
            return assignDetails(req, res, pictures);
        }).catch(err => {
            return auth.sendError(res, err, 400);
        });
    }
};
