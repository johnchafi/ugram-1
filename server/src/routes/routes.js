const express = require('express');
const router = express.Router();

const swaggerUiAssetPath = require('swagger-ui-dist').getAbsoluteFSPath();

const root = require('../controllers/root');
const pictures = require('./pictures');
const users = require('./users');
const login = require('./login');

router.use('/pictures', pictures);
router.use('/users', users);
router.use('/login', login);

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

module.exports = router;
