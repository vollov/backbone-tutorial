'use strict';

var request = require('supertest')
	, should = require('should')
	, app = require('../../server').app;

describe('Test users api/n', function() {

	var url_user_api = '/api/users';
	
	describe('Test get a list of users: GET->' + url_user_api, function() {
		
		it('should return 4 users for url ' + url_user_api, function(done) {
			request(app)
			.get(url_user_api)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(200)
			.end(function(err,res){
				should.not.exist(err);
				res.body.should.have.lengthOf(4);
				res.body[0].should.have.property('firstname', 'Annie');
				if (err) return done(err);
				done();
			});
		});
	});
});
