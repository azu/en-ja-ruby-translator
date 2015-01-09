"use strict";
// ==UserScript==
// @name        en-ja-ruby-translator
// @namespace   http://efcl.info/
// @description translate en to ja word.
// @include     http://*
// @include     https://*
// @version     1
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @noframes
// @license : MIT
// ==/UserScript==
var rubyTranslator = require("./lib/ruby-translator");
var findAncestorContainer = require("./lib/find-ancestor-container");
var GM_addStyle = require("./lib/GM_addStyle");
var isAddedStyle = false;
var addStyle = (function () {
    return function onceAddStyle() {
        if (isAddedStyle) {
            return;
        }
        GM_addStyle(require("fs").readFileSync(__dirname + "/css/ruby.css", "utf-8"));
        isAddedStyle = true;
    }
})();

function hasSelection(){
    return window.getSelection().toString().length > 0;
}
// Alt+Click-up
var hiddenContainers = [];
document.addEventListener('mouseup', function (event) {
    var container;
    if (isAddedStyle) {
        container = findAncestorContainer();
        // 選択範囲がない場合は、隠してたやつは全部元に戻す
        if(!hasSelection()) {
            hiddenContainers.forEach(function (container) {
                container.classList.remove("GM__ruby-translator__hidden");
            });
            return;
        }
        if (!container.classList.contains("GM__ruby-translator__hidden")) {
            container.classList.add("GM__ruby-translator__hidden");
            hiddenContainers.push(container);
        }

        return;
    }
    if (!event.altKey) {
        return
    }
    container = findAncestorContainer();
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
