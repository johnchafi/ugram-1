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

    describe('Get a fake user /GET/users', () => {
        it('it should get the user pictures', (done) => {
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