const express = require('express');
const ApiDoc = require('../controllers/apiDoc');

const router = express.Router();

router.use('/', new ApiDoc().router);

module.exports = router;
