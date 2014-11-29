// LICENSE : MIT
"use strict";
var fs = require("fs");
var dictionary = require("../data/gene95/gene.json");
var removePattern = /^\d\./;
/**
 * translate word => result [translated]
 * @param {string} word
 * @returns {Array}
 */
function translateWord(word) {
    var translated = dictionary[word.trim()];
    if (!translated) {
        return [];
    }
    return translated.map(function (text) {
        return text.replace(removePattern, "");
    });
}
module.exports = translateWord;