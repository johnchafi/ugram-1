const express = require('express');
const router = express.Router();

const root = require('./root');
const apidoc = require('./api-doc');
const pictures = require('./pictures');
const users = require('./users');

router.use('/pictures', pictures);
router.use('/users', users);

router.use('/', apidoc);

module.exports = router;
