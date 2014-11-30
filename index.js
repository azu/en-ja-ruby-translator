"use strict";
// ==UserScript==
// @name        en-ja-ruby-dictionary
// @namespace   http://efcl.info/
// @description translate en to ja word.
// @include     http://*
// @include     https://*
// @version     1
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @resource    rubyCSS ruby.css
// @noframes
// @license : MIT
// ==/UserScript==
var rubyTranslator = require("./lib/ruby-translator");
var findAncestorContainer = require("./lib/find-ancestor-container");
var GM_addStyle = require("./lib/GM_addStyle");
var addStyle = (function () {
    var isAddedStyle = false;
    return function onceAddStyle() {
        if (isAddedStyle) {
            return;
        }
        GM_addStyle(require("fs").readFileSync(__dirname + "/css/ruby.css", "utf-8"));
        isAddedStyle = true;
    }
})();
// Alt+Click-up
document.addEventListener('mouseup', function (event) {
    if (!event.altKey) {
        return
    }
    var container = findAncestorContainer();
    if (container == null) {
        return;
    }
    if (container.classList.contains("GM__ruby-translator")) {
        return;
    }
    addStyle();
    container.classList.add("GM__ruby-translator");
    rubyTranslator.annotateRubyToBody(container);
}, false);
