const {expect} = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');

const server = require('../../../server');
const Users = require('../../../models/users');

describe('API', function() {
    describe('/api/users', function() {
        before(function() {
            const stubbedGetAllUsers = sinon.stub(Users, 'getAllUsers');
            stubbedGetAllUsers.resolves([new Users('Brian', 123, 'Luis', 'algo@algo.com', 'Hombre', '10/12/1996', '/123.jpg', 'algo sobre mi', 5, 25, 'si')]);
        });
        after(function() {
            Users.getAllUsers.restore();
        });

        it('retornar todos los usuarios para GET /', function(done) {
            supertest(server)
            .get("/api/users")
            .then(response => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array').that.have.lengthOf(1);
                expect(response.body).to.deep.equal([{username: 'Brian', password: 123 , nombre: 'Luis', mail: 'algo@algo.com', sexo: 'Hombre', birthday: '10/12/1996', avatar:'/123.jpg', sobremi:'algo sobre mi', votos:5, puntaje: 25, administrador:'si'}]);
                done();
            })
            .catch(done);
        });
    });
});