const express = require('express');
const router = express.Router({mergeParams: true});

const like = require('../controllers/like');

router.get('/', like.getLikes);

module.exports = router;
