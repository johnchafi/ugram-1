const service = require('../services/root');

exports.get = (req, res, next) => {
    return res.send(service.getRoot());
};