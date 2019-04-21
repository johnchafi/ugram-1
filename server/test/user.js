//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

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

let userUpdate = {
    firstName: "string",
    lastName: "string",
    email: "utututu@uniTestUserUniqueForTesting.com",
    phoneNumber: "01234"
};

describe('User manipulation', () => {

    describe('/POST/users', () => {
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

    describe('Error check /POST/users', () => {
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


    describe('/GET/users', () => {
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

    describe('/PUT/users', () => {
        it('it should get the new user', (done) => {
            chai.request(server.app)
                .put('/users/' + userId)
                .set('Authorization', 'Bearer ' + token)
                .send(userUpdate)
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
                    res.body.should.have.property('email').eql(userUpdate.email);
                    res.body.should.have.property('firstName').eql(userUpdate.firstName);
                    res.body.should.have.property('lastName').eql(userUpdate.lastName);
                    done();
                });
        });
    });

    describe('Error check /GET/users', () => {
        it('it should return 404', (done) => {
            chai.request(server.app)
                .get('/users/TESTBEAUCOUPTROPIMPROBABLE')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('/DELETE/users', () => {
        it('it should delete the user', (done) => {
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