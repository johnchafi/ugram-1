const express = require('express');
const router = express.Router({mergeParams: true});

const tag = require('../controllers/tag');

router.get('/', tag.getTags);
router.get('/popular', tag.getPopularTags);

module.exports = router;
