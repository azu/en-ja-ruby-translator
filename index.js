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
document.addEventListener('mouseup', function (ev) {
    var container = findAncestorContainer();
    if (container == null) {
        return;
    }
    if (container.classList.contains("GM__ruby-translator")) {
        return;
    }
    addStyle();
    container.classList.add("GM__ruby-translator");
    replaceRuby(container);
}, false);
function replaceRuby(body) {
    if (body == null) {
        return;
    }
    var r = document.evaluate(
        './/text()',
        body,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    var i;
    for (i = 0; i < r.snapshotLength; i++) {
        var node = r.snapshotItem(i);
        if (!rubyTranslator.canTranslateNode(node)) {
            continue;
        }
        var rubyContainerNode = rubyTranslator.translateNode(node);
        if (rubyContainerNode == null) {
            continue;
        }
        node.parentNode.replaceChild(rubyContainerNode, node);
    }
}
