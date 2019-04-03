const express = require('express');
const router = express.Router({mergeParams: true});

const comment = require('../controllers/comment');

router.get('/', comment.getComments);

router.post('/', comment.addComment);

module.exports = router;
