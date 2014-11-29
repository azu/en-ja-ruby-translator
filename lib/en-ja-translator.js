// LICENSE : MIT
"use strict";
// normalize ruleset from http://d.hatena.ne.jp/h1mesuke/20090729/p1
var ruleList = [
    // *s
    [/ies$/, 'y'],
    [/ves$/, 'fe'],
    [/ves$/, 'f'],
    [/es$/, ''],
    [/s$/, ''],
    // *ing
    [/cking$/, 'c'],
    [/(\w)\1ing$/, '\\1'],
    [/ing$/, ''],
    [/ing$/, 'e'],
    // *ed
    [/cked$/, 'c'],
    [/ied$/, 'y'],
    [/(\w)1ed$/, '\\1'],
    [/ed$/, ''],
    [/ed$/, 'e'],
    // *er, *est
    [/ie(r|st)$/, 'y'],
    [/(\w)\1e(r|st)$/, '\\1'],
    [/e(r|st)$/, ''],
    [/(r|st)$/, ''],
    // *ly
    [/ly$/, '']
];
function normalize(word) {
    ruleList.forEach(function (rule) {
        word = word.replace(rule[0], rule[1]);
    });
    return word;
}
/**
 * translate word => result [translated]
 * @param {string} word
 * @returns {Array}
 */
function translateWord(word) {
    var dictionary = require("../data/gene95/gene.json");
    var translated = dictionary[normalize(word)];
    if (!translated) {
        return [];
    }
    return translated.map(function (text) {
        return text;
    });
}
module.exports = translateWord;