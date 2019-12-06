const {expect} = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');

const server = require('../../../server');
const Memes = require('../../../models/memes');

describe('API', function() {
    describe('/api/memes', function() {
        before(function() {
            const stubbedGetAllMemes = sinon.stub(Memes, 'getAllMemes');
            stubbedGetAllMemes.resolves([new Memes('idmeme', 'creador', 'titulo', 'tags', 'foto', 'categoria', 'fecha', 'aprobacion')]);
        });
        after(function() {
            Memes.getAllMemes.restore();
        });

        it('retornar todos los memes para GET /', function(done) {
            supertest(server)
            .get("/api/memes")
            .then(response => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array').that.have.lengthOf(1);
                expect(response.body).to.deep.equal([{idmeme: 'idmeme', creador: 'creador', titulo: 'titulo', tags: 'tags', foto: 'foto', categoria: 'categoria', fecha: 'fecha', aprobacion: 'aprobacion'}]);
                done();
            })
            .catch(done);
        });
    });
});