const express = require('express');
const router = express.Router({mergeParams: true});

const pictures = require('../controllers/pictures');

router.get('/', pictures.getPictures);

module.exports = router;