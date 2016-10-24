"use strict";

var assert = require('assert');
var maxPath = require('../src/max-path');



describe('#indexOf()', function () {
    it('should return max number', function () {
        assert.equal(2, maxPath.maximum(1, 2));
    });
});