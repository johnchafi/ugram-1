const express = require('express');
const router = express.Router({mergeParams: true});

const users = require('../controllers/login');

router.post('/', users.loginUser);

module.exports = router;
