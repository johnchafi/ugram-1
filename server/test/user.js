//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let User = require('../src/models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let token = "";
let userId = "unitTestUserThatShouldBeCreatedUT";
let should = chai.should();
let pictureId = 0;
let likeId = 0;
let commentId = 0;

chai.use(chaiHttp);
//Our parent block
let user = {
    id : userId,
    firstName: "UnitTestUser",
    lastName: "UnitTestUser",
    email: "utututu@uniTestUserUniqueForTesting.com",
    password: "1234567890",
    phoneNumber: "0"
};

let userUdpate = {
    firstName: "string",
    lastName: "string",
    email: "utututu@uniTestUserUniqueForTesting.com",
    phoneNumber: "01234"
};

let like = {
    userId : userId,
    pictureId : pictureId,
    ownerId: userId
};

let comment = {
    userId: userId,
    pictureId: pictureId,
    message: "Hello world",
    ownerId: userId
};


describe('Users unit test', () => {

    describe('Create a user /POST/users', () => {
        it('it should create a new user', (done) => {
            chai.request(server.app)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    token = res.body.token;
                    res.should.have.status(201);
                    done();
                });
        });
    });

    describe('Create a duplicate user /POST/users', () => {
        it('it should return already existing user', (done) => {
            chai.request(server.app)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });


    describe('Get a user /GET/users', () => {
        it('it should get the new user', (done) => {
            chai.request(server.app)
                .get('/users/' + userId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eql(user.id);
                    res.body.should.have.property('email').eql(user.email);
                    res.body.should.have.property('firstName').eql(user.firstName);
                    res.body.should.have.property('lastName').eql(user.lastName);
                    done();
                });
        });
    });

    describe('Update a user /PUT/users', () => {
        it('it should get the new user', (done) => {
            chai.request(server.app)
                .put('/users/' + userId)
                .set('Authorization', 'Bearer ' + token)
                .send(userUdpate)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
    });

    describe('Get updated user /GET/users', () => {
        it('it should get the updated user', (done) => {
            chai.request(server.app)
                .get('/users/' + userId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eql(user.id);
                    res.body.should.have.property('email').eql(userUdpate.email);
                    res.body.should.have.property('firstName').eql(userUdpate.firstName);
                    res.body.should.have.property('lastName').eql(userUdpate.lastName);
                    done();
                });
        });
    });

    describe('Get user pictures /GET/{userId}/pictures', () => {
        it('it should get the user pictures', (done) => {
                chai.request(server.app)
                .get('/users/' + userId + '/pictures')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('Upload a picture for the user /POST/{userId}/pictures', () => {
        it('it should upload a picture for the user', (done) => {
            chai.request(server.app)
                .post('/users/' + user.id + '/pictures')
                .set('Authorization', 'Bearer ' + token)
                .field('description', 'Test')
                .field('mentions', userId)
                .field('tags', 'test')
                .attach('file', './test/test.jpg').end((err, res) => {
                res.should.have.status(200);
                pictureId = res.body.id;
                comment.pictureId = pictureId;
                done();
            })
        })
    });

    describe('Get a fake uploaded picture /GET/{userId]/pictures/{pictureId]', () => {
        it('it should get 404', (done) => {
            chai.request(server.app)
                .get('/users/' + user.id + '/pictures/' + -1)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })
    });

    describe('Get a freeshly uploaded picture /GET/{userId]/pictures/{pictureId]', () => {
        it('it get the new picture uploaded', (done) => {
            chai.request(server.app)
                .get('/users/' + user.id + '/pictures/' + pictureId)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    });

    // Like picture
    describe('Like a picture /POST/users/{userId}/pictures/{pictureId}/like', () => {
        it('it should like the picture', (done) => {
            chai.request(server.app)
                .post('/users/' + userId + '/pictures/' + pictureId + '/like')
                .set('Authorization', 'Bearer ' + token)
                .send(like)
                .end((err, res) => {
                    res.should.have.status(200);
                    likeId = res.body.comment.id;
                    done();
                });
        });
    });

    // Check notifications
    describe('Get Notification /GET/users/{userId}/notifications', () => {
        it('it should get the notifications', (done) => {
            chai.request(server.app)
                .get('/users/' + userId + '/notifications')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    // Unlike picture

    describe('Deleting the like /DELETE/users/{userId}/pictures/{pictureId}/like/{likeId}', () => {
        it('it should delete the like', (done) => {
            chai.request(server.app)
                .delete('/users/' + userId  + '/pictures/' + pictureId + '/like/' + likeId)
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    console.log(res);
                    res.should.have.status(204);
                    done();
                });
        });
    });

    // Comment picture
    describe('Commenting the picture /POST/{userId}/pictures/{pictureId}/comment', () => {
        it('it should comment the picture', (done) => {
            chai.request(server.app)
                .post('/users/' + userId  + '/pictures/' + pictureId + '/comment')
                .set('Authorization', 'Bearer ' + token)
                .send(comment)
                .end((err, res) => {
                    res.should.have.status(200);
                    commentId = res.body.comment.id;
                    done();
                });
        });
    });


    // Delete a comment
    describe('Deleting the comment /DELETE/{userId}/pictures/{pictureId}/comment/{commentId]', () => {
        it('it should delete the comment', (done) => {
            chai.request(server.app)
                .delete('/users/' + userId  + '/pictures/' + pictureId + '/comment/' + commentId)
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });

    // Delete picture
    describe('Deleting the picture /DELETE/{userId}/pictures/{pictureId}', () => {
        it('it should delete the picture', (done) => {
            chai.request(server.app)
                .delete('/users/' + userId  + '/pictures/' + pictureId)
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });


    describe('Get a fake user /GET/users', () => {
        it('it should return 404', (done) => {
            chai.request(server.app)
                .get('/users/TESTBEAUCOUPTROPIMPROBABLE')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('Deleting the user /DELETE/users', () => {
        it('it should delete the new user', (done) => {
            chai.request(server.app)
                .delete('/users/' + userId)
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});