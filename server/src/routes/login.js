const express = require('express');
const router = express.Router({mergeParams: true});

const users = require('../controllers/login');

router.post('/', users.loginUser);
router.post('/token', users.getUserToken);
router.post('/google', users.loginUserGoogle);

module.exports = router;
