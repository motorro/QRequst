/**
 * Common test environment
 * User: motorro
 * Date: 15.01.2015
 * Time: 8:08
 */
"use strict";

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

global.chaiAsPromised = chaiAsPromised;
global.expect = chai.expect;
global.should = chai.should();
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;