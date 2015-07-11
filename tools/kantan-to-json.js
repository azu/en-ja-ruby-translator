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
enKeys.forEach(function (key) {
    var jaWords = dict[key].ja.filter(function (jaWord) {
        return !isIgnoreWord(jaWord);
    });
    if(jaWords.length > 0) {
        results[key] = dict[key].ja;
    }
});
fs.writeFileSync(outputPath, JSON.stringify(results));