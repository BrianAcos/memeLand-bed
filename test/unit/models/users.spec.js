const sinon = require('sinon');
const {expect} = require('chai');
const db = require('../../../services/db-connection');
const Users = require('../../../models/users');

describe('#getUsersByUsername()', function() {
    before(function() {
        const stubbedDbQuery = sinon.stub(db, 'query');
        stubbedDbQuery.callsArgWith(2, null, [{username: 'fakeUser'}]);
    });

    after(function() {
        db.query.restore();
    })

    it('should get without error', function(done) {

        Users.getUserById('test-user')
        .then((user) => {
            expect(user).to.not.be.undefined;
            expect(user.username).to.equal('fakeUser');
            done();
        })
        .catch((err) => {
            done(err);
        });
    });
})
