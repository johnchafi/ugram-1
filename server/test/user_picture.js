//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let token = "";
let userId = "unitTestUserThatShouldBeCreatedUT";
let should = chai.should();
let pictureId = 0;

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

let pictureUpdate = {
    mentions: [],
    tags : ["toto"],
    description: "Test-2"
};

describe('Test on user picture', () => {

    describe('/POST/users', () => {
        it('Create a new user (user picture)', (done) => {
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
        it('Upload a picture', (done) => {
            chai.request(server.app)
                .post('/users/' + user.id + '/pictures')
                .set('Authorization', 'Bearer ' + token)
                .field('description', 'Test')
                .field('mentions', userId)
                .field('tags', 'test')
                .attach('file', './test/test.jpg').end((err, res) => {
                res.should.have.status(200);
                console.log(res.body);
                pictureId = res.body.id;
                done();
            })
        })
    });

    describe('/PUT/{userId}/pictures/{pictureId}', () => {
        it('Update a picture', (done) => {
            chai.request(server.app)
                .put('/users/' + user.id + '/pictures/' + pictureId)
                .set('Authorization', 'Bearer ' + token)
                .send(pictureUpdate)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                })
        })
    });

    describe('/GET/{userId]/pictures/{pictureId]', () => {
        it('Get the new picture', (done) => {
            chai.request(server.app)
                .get('/users/' + user.id + '/pictures/' + pictureId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eql(pictureId);
                    res.body.should.have.property('description').eql(pictureUpdate.description);
                    done();
                })
        })
    });

    // Delete picture
    describe('/DELETE/{userId}/pictures/{pictureId}', () => {
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