// LICENSE : MIT
"use strict";
var assert = require("power-assert");
var jsdom = require('mocha-jsdom');
var rubyTranslator = require("../lib/ruby-translator");
describe('ruby-translator', function () {
    jsdom();
    context("when contain continuing separator", function () {
        it('should keep separator', function () {
            var div = document.createElement("div");
            // <space><double quote>
            div.innerHTML = '<p> "test.js" </p>';
            var rubyP = rubyTranslator.translateNode(div);
            var result = rubyP.textContent;
            assert.equal(result, ' "test.js" ');
        });
    });
});