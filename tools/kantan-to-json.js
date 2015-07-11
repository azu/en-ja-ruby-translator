// LICENSE : MIT
"use strict";
var fs = require('fs');
var outputPath = __dirname + "/../data/gene95/gene.json";
var results = {};
var dict = require("kantan-ej-dict");
var enKeys = Object.keys(dict);
function isIgnoreWord(word) {
    if (/^=/.test(word)) {
        return true;
    }
    return false;
}
// svl_levelを4以上のみにする
function limitSVLLevel(object) {
    // レベルがないものはとりあえず含める
    return object["svl_level"] == null || object["svl_level"] >= 4;
}
enKeys.forEach(function (key) {
    var object = dict[key];
    if (!limitSVLLevel(object)) {
        return;
    }
    var jaWords = dict[key].ja.filter(function (jaWord) {
        return !isIgnoreWord(jaWord);
    });
    if (jaWords.length > 0) {
        results[key] = jaWords;
    }
});
fs.writeFileSync(outputPath, JSON.stringify(results));