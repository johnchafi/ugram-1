const express = require('express');
const router = express.Router({mergeParams: true});

const root = require('../controllers/root');

router.get('/', root.get);

module.exports = router;