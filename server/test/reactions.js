process.env.NODE_ENV = 'test';

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
    id :  userId,
    firstName: "UnitTestUser",
    lastName: "UnitTestUser",
    email: "utututu@uniTestUserUniqueForTesting.com",
    password: "1234567890",
    phoneNumber: "0"
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


describe('Reactions test', () => {

    describe('/POST/users', () => {
        it('Create a new user (reactions)', (done) => {
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

    describe('/POST/{userId}/pictures', () => {
        it('Upload a picture (reactions)', (done) => {
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

    describe('/GET/tag?q=tag', () => {
        it('Get specific tag', (done) => {
            chai.request(server.app)
                .get('/tag?q=test')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        })
    });

    describe('/GET/pictures?tag={tag}', () => {
        it('Get picture with specific tag', (done) => {
            chai.request(server.app)
                .get('/pictures?tag=test')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        })
    });

    // Like picture
    describe('/POST/users/{userId}/pictures/{pictureId}/like', () => {
        it('Like a picture', (done) => {
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
    describe('/GET/users/{userId}/notifications', () => {
        it('Get the notification', (done) => {
            chai.request(server.app)
                .get('/users/' + userId + '/notifications')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    // Unlike picture
    describe('/DELETE/users/{userId}/pictures/{pictureId}/like/{likeId}', () => {
        it('Delete like', (done) => {
            chai.request(server.app)
                .delete('/users/' + userId + '/pictures/' + pictureId + '/like/' + likeId)
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    console.log(res);
                    res.should.have.status(204);
                    done();
                });
        });
    });

    // Comment picture
    describe('/POST/{userId}/pictures/{pictureId}/comment', () => {
        it('Comment the picture', (done) => {
            chai.request(server.app)
                .post('/users/' + userId + '/pictures/' + pictureId + '/comment')
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
    describe('/DELETE/{userId}/pictures/{pictureId}/comment/{commentId]', () => {
        it('Delete the comment', (done) => {
            chai.request(server.app)
                .delete('/users/' + userId + '/pictures/' + pictureId + '/comment/' + commentId)
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });

    // Delete picture
    describe('/DELETE/{userId}/pictures/{pictureId}', () => {
        it('Delete the picture', (done) => {
            chai.request(server.app)
                .delete('/users/' + userId + '/pictures/' + pictureId)
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });

    // Delete user
    describe('/DELETE/users', () => {
        it('Deleting the user', (done) => {
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