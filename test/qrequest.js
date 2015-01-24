/**
 * QRequest test
 * User: motorro
 * Date: 24.01.2015
 * Time: 7:04
 */

"use strict";
var request = require("request");

describe ("QRequest", function(){
    it ("should exist and be a constructor", function() {
        should.exist(Request);
        Request.should.be.an('function');
    });
    it ("should respond to 'bodyIfStatusOk'", function(){
        Request.should.itself.respondTo('bodyIfStatusOk');
    });
    it ("should respond to 'body'", function(){
        Request.should.itself.respondTo('body');
    });
    it ("should have raw 'request' as a static property 'raw'", function() {
        Request.should.have.property('raw').that.is.equal(request);
    });
    it ("should respond to 'del'", function(){
        Request.should.respondTo('del');
    });
    it ("should respond to 'get'", function(){
        Request.should.respondTo('get');
    });
    it ("should respond to 'head'", function(){
        Request.should.respondTo('head');
    });
    it ("should respond to 'patch'", function(){
        Request.should.respondTo('patch');
    });
    it ("should respond to 'post'", function(){
        Request.should.respondTo('post');
    });
    it ("should respond to 'put'", function(){
        Request.should.respondTo('put');
    });
    it ("should have bound 'request' as a 'raw' property", function(done){
        var r = new Request({url: "http://echo.jsontest.com/key/value/one/two"});
        r.should
            .have.property('raw')
            .that.have.property('defaults')
            .that.is.equal(request.defaults);
        r.raw.get(undefined, function(err, response, body) {
            expect(err).to.be.null;
            JSON.parse(body).should.be.deep.equal({
                "one": "two",
                "key": "value"
            });
            done();
        });
    });
    it ("should make requests to existing URL", function(){
        return (new Request).get("http://echo.jsontest.com/key/value/one/two")
            .spread(function(responce, body){
                return JSON.parse(body);
            })
            .should.eventually.deep.equal({
                "one": "two",
                "key": "value"
            });
    });
    it ("should get body if response status is 200", function(){
        return (new Request).get("http://echo.jsontest.com/key/value/one/two")
            .spread(Request.bodyIfStatusOk(200))
            .then(JSON.parse)
            .should.eventually.deep.equal({
                "one": "two",
                "key": "value"
            });
    });
    it ("should fail on incorrect status using 'bodyIfStatusOk' shortcut", function(){
        return (new Request).get("http://echo.jsontest.com/key/value/one/two")
            .spread(Request.bodyIfStatusOk(500))
            .should.eventually.be.rejectedWith(RangeError);
    });
    it ("should get body if response status is 200 using a 'body' shortcut", function(){
        return (new Request).get("http://echo.jsontest.com/key/value/one/two")
            .spread(Request.body)
            .then(JSON.parse)
            .should.eventually.deep.equal({
                "one": "two",
                "key": "value"
            });
    });
});