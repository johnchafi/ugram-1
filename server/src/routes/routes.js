const express = require('express');
const router = express.Router();

const root = require('./root');
const pictures = require('./pictures');
const users = require('./users');

router.use('/', root);
router.use('/pictures', pictures);
router.use('/users', users);

module.exports = router;