// LICENSE : MIT
"use strict";
var assert = require("power-assert");
var jsdom = require('mocha-jsdom');
var rubyTranslator = require("../lib/ruby-translator");
describe('mocha tests', function () {
    jsdom();
    it('has document', function () {
        var div = document.createElement("div");
        div.innerHTML = '<p> "test.js" </p>';
        var rubyP = rubyTranslator.translateNode(div);
        var result = rubyP.textContent;
        assert.equal(result, ' "test.js" ');
    });
});