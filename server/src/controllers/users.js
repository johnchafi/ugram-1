//const service = require('../services/users');
const UsersModel = require('../models/user');

    /**
     * @swagger
     * /users:
     *   post:
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
//  Gets all the users
exports.getUsers = (req, res, next) => {
    UsersModel.get(function (err, users) {
        if (err) {
            res.status(500);
            res.send("Internal error");
        } else {
            res.json({
                users
            });
        }
    });
};

// Gets a specific user
exports.getUser = (req, res, next) => {
    UsersModel.findById(req.params.userId, function (err, user) {
        if (err) {
            res.status(400);
            res.send("Unexisting user or missing parameter userId");
        } else {
            res.json({
                user
            });
        }
    });
};

// Edits the fields of a specific user
exports.editUser = (req, res, next) => {
    UsersModel.findById(req.params.userId, function (err, user) {
        //check auth
        let auth = true;
        if (!auth) {
            res.status(401);
            res.send("No authentication provided");
        }
        else {
            if (err) {
                res.status(400);
                res.send("Unexisting user");
            } else {
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.phoneNumber = req.body.phoneNumber;

                //update user
                user.save(function (err) {
                    if (err) {
                        res.status(400);
                        res.send("Missing parameter");
                    } else {
                        res.status(201);
                        res.send("Updated");
                    }
                });
            }
        }
    });
};

// Gets the pictures of a user
exports.getUserPictures = (req, res, next) => {
    return res.send(service.getUserPictures(req.params.userId));
};

// Uploads a picture for a user
exports.addUserPicture = (req, res, next) => {
    const response = service.addUserPicture(req.params.userId, req.params.body).then(function(data) {
        return res.send('Upload successful');
    }).catch(function(err) {
        console.log(err);
        res.status(500).send('An error occured');
    });
};

// Gets a single picture
exports.getUserPicture = (req, res, next) => {
    return res.send(service.getUserPicture(req.params.userId, req.params.pictureId));
};

// Edits the fields of a picture for a user
exports.editUserPicture = (req, res, next) => {
    return res.send(service.editUserPicture(req.params.userId, req.params.pictureId, req.params.body));
};

// Deletes a picture for a user
exports.deleteUserPicture = (req, res, next) => {
    return res.send(service.deleteUserPicture(req.params.userId, req.params.pictureId));
};