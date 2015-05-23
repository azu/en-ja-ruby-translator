// LICENSE : MIT
"use strict";

var dictPath = __dirname + "/../data/gene95/gene.txt";
var outputPath = __dirname + "/../data/gene95/gene.json";
var XReadLine = require("x-readline");
var fs = require('fs');
var readStream = fs.createReadStream(dictPath, {encoding: 'utf8'});
var xReadLine = new XReadLine(readStream);
var results = {};

/*
    2014-11-30: 熟語は未対応なのでスペースを含む単語を外す
 */
function isIgnoreWord(word) {
    if (/\s/.test(word)) {
        return true;
    }
    return false;
}
function trimWord(word) {
    var removeCaptionPattern = /^\d\./;
    var removeFirstBrackets = /^\(.*?\)/;
    var removeBrackets = /(《.*?》|\[.*?\]|【.*?】)/;
    return word.replace(removeBrackets, "").replace(removeCaptionPattern, "").replace(removeFirstBrackets, "");
}
xReadLine.forEach(2, function (list) {
    var original = list[0],
        translation = list[1];
    if (isIgnoreWord(original)) {
        console.log(original);
        return;
    }
    results[original] = [
        translation.split(",").map(function (word) {
            return trimWord(word);
        })[0]
    ];
}, function () {
    fs.writeFileSync(outputPath, JSON.stringify(results));
});