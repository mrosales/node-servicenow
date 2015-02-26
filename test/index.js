var should = require('chai').should(),
    SN = require('../index');

var options = {
    user: 'fake_username', 
    pass: 'fake_password', 
    instance: 'fake_instance'
};


describe('#config', function() {
    it('configures properly', function() {
        var ServiceNow = SN(options);
        should.exist(ServiceNow);
        ServiceNow.should.have.property('Incident');
    });
    it('requires all config fields', function() {
        var SN1 = SN({});
        should.not.exist(SN1);
    });
});