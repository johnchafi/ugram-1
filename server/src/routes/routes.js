const express = require('express');
const router = express.Router();

const swaggerUiAssetPath = require('swagger-ui-dist').getAbsoluteFSPath();

const root = require('../controllers/root');
const pictures = require('./pictures');
const users = require('./users');

router.use('/pictures', pictures);
router.use('/users', users);

/**
 * @swagger
 * /info:
 *   get:
 *     tags:
 *       - api documentation json
 *     description: Get api documentation route information
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All Api Doc informations
 */
router.get('/info', root.getInfo);

// Tricky part to change default swagger url
router.get('/', root.get);
router.get('/index.html', root.get);
router.use('/', express.static(swaggerUiAssetPath))

module.exports = router;
