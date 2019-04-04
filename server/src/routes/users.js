const express = require('express');
const router = express.Router({mergeParams: true});

const users = require('../controllers/users');

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Get current user
 *     description:  Get current user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Body
 *         required: true
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Offer'
 *     responses:
 *       201:
 *         description: Successfully created
 *         headers:
 *           Location:
 *             description: /users/
 *             type: string
 *       400:
 *          description: Bad request
 * @swagger
 * definition:
 *   Offer:
 *     properties:
 *       title:
 *         type: string
 *         description: Title of the offer
 *       description:
 *         type: string
 *         description: Description of the offer
 *       owner:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *             description: Name of the owner of the offer
 *           phoneNumber:
 *             type: string
 *             description: Phone number of the owner
 *           email:
 *             type: string
 *             description: Mail of the owner
 */
router.get('/', users.getUsers);
router.post('/', users.createUser);
router.get('/:userId', users.getUser);
router.put('/:userId', users.editUser);
router.delete('/:userId', users.deleteUser);

router.get('/:userId/pictures', users.getUserPictures);
router.post('/:userId/pictures', users.addUserPicture);
router.delete('/:userId/pictures', users.deleteUserPictures);

router.get('/:userId/pictures/:pictureId', users.getUserPicture);
router.put('/:userId/pictures/:pictureId', users.editUserPicture);
router.delete('/:userId/pictures/:pictureId', users.deleteUserPicture);

router.post('/:userId/pictures/:pictureId/comment', users.addComment);
router.delete('/:userId/pictures/:pictureId/comment/:id', users.deleteUserComment);

router.post('/:userId/pictures/:pictureId/like', users.addLike);
router.delete('/:userId/pictures/:pictureId/like/:id', users.deleteUserLike);

router.get('/:userId/notifications', users.getNotifications);

module.exports = router;
