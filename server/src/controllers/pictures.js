const service = require('../services/pictures');

//Gets the pictures ordered by creation date
exports.getPictures = (req, res, next) => {
    return res.send(service.getPictures());
};