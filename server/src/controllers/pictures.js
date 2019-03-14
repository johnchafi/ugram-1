const service = require('../services/pictures');
const PictureModel = require('../models/picture');
const TagModel = require('../models/tag');
const MentionModel = require('../models/mention');

//Gets the pictures ordered by creation date
exports.getPictures = (req, res, next) => {
    PictureModel.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then(pictures => {
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
                res.status(200);
                return res.json({items : pictures});
            }).catch(err => {
                res.status(400);
                return res.send(err);
            });
        }).catch(err => {
            res.status(400);
            return res.send(err);
        });
    }).catch(err => {
        res.status(400);
        return res.send(err);
    });
};
