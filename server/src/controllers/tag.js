const logger = require('../common/logger');

const TagModel = require('../models/tag');

const auth = require('../services/auth');
const pagination = require('../services/pagination');
const db = require('../services/database');
const Op = db.Sequelize.Op;

exports.getTags = (req, res, next) => {
    logger.log('info', "[REQUEST : GET TAGS] TRYING GET TAGS.", {tags: 'request,get'});
    TagModel.findAll().then(tags => {
        return auth.sendSuccess(
            res,
            pagination.formatPagination(tags, req.query.page, req.query.perPage),
            200
        );
    }).catch(err => {
        return auth.sendError(res, err.message, err.code);
    });
};

exports.getPopularTags = (req, res, next) => {
    logger.log('info', "[REQUEST : GET POPULAR TAGS] TRYING GET POPULAR TAGS.", {tags: 'request,get'});
    let filter = "";
    if (req.query.q !== undefined && req.query.q !== "") {
        filter = req.query.q;
    }
    TagModel.count({
        attributes: [
            TagModel.rawAttributes.value.field,
        ],
        where: {
           value: {
             [Op.like]: filter + '%'
           }
        },
        group : ['tag']
     }).then(tags => {
        return auth.sendSuccess(
            res,
            pagination.formatPagination(tags, req.query.page, req.query.perPage),
            200
        );
    }).catch(err => {
        return auth.sendError(res, err.message, err.code);
    });
};