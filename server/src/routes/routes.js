const express = require('express');
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../documentation/swagger-doc-ugram.json');

const root = require('../controllers/root');
const pictures = require('./pictures');
const users = require('./users');
const login = require('./login');
const like = require('./like');
const comment = require('./comment');
const tag = require('./tag');

router.use('/pictures', pictures);
router.use('/users', users);
router.use('/login', login);
router.use('/comment', comment);
router.use('/like', like);
router.use('/tag', tag);

router.get('/info', root.getInfo);

// Tricky part to change default swagger url
router.get('/index.html', root.get);
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;
