const express = require('express');
const router = express.Router({mergeParams: true});

const users = require('../controllers/users');


router.post('/', users.createUser);

router.get('/', users.getUsers);
router.get('/:userId', users.getUser);
router.put('/:userId', users.editUser);

router.get('/:userId/pictures', users.getUserPictures);
router.post('/:userId/pictures', users.addUserPicture);

router.get('/:userId/pictures/:pictureId', users.getUserPicture);
router.put('/:userId/pictures/:pictureId', users.editUserPicture);
router.delete('/:userId/pictures/:pictureId', users.deleteUserPicture);

module.exports = router;