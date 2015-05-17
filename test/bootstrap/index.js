// Lodash
global._ = require('lodash');

// Sinon
global.sinon = require('sinon');

// Chai
global.chai   = require('chai');
global.should = global.chai.should();

// Sinon-Chai
global.chai.use(require('sinon-chai'));

// Helpers
global.chai.use(require('../helpers/'));

// Rewire
global.rewire = require('rewire');
