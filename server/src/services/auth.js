const uuidv4 = require('uuid/v4');

const UserModel = require('../models/user');
const TokenModel = require('../models/token');

exports.getToken = (req) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }
    return token;
}

exports.generateToken = () => {
    return uuidv4();
}

exports.isDefined = (data) => {
    return !(data === undefined || data === null || data === "" || Object.keys(data).length === 0);
}

exports.isAuthenticated = (req) => {
    const token = this.getToken(req);
    if (!token) {
        const promise = new Promise(function(resolve, reject) {
            throw "Bearer token missing from Authorization";
        });
        return promise;
    }
    return TokenModel.findOne({
        where: {
            token: token
        }
    }).then(token => {
        if (token === null) throw "Token supplied does not exist";
        if (req.params.userId !== token.userId) throw "Wrong user id specified in url parameters";
        return UserModel.findByPk(token.userId).catch(err => {
            throw "Specified user id does not correspond to supplied token";
        });
    }).catch(err => {
        throw err;
    });
}

exports.sendSuccess = (res, data, code) => {
    res.status(code);
    if (!this.isDefined(data)) {
        return res.send();
    }
    return res.json(data);
}

exports.sendError = (res, error, code) => {
    console.log(error);
    if (!this.isDefined(error)) {
        console.log(error);
        error = "Unexpected error";
    }
    res.status(code);
    res.end(error);
}
