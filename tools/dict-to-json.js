// LICENSE : MIT
"use strict";

var dictPath = __dirname + "/../data/gene95/gene.txt";
var outputPath = __dirname + "/../data/gene95/gene.json";
var XReadLine = require("x-readline");
var fs = require('fs');
var readStream = fs.createReadStream(dictPath, {encoding: 'utf8'});
var xReadLine = new XReadLine(readStream);
var results = {};

function trimWord(word) {
    var removeCaptionPattern = /^\d\./;
    var removeBrackets = /(《.*?》|\[.*?\]|【.*?】)/;
    return word.replace(removeBrackets, "").replace(removeCaptionPattern, "");
}
xReadLine.forEach(2, function (list) {
    var original = list[0],
        translation = list[1];
    results[original] = [translation.split(",").map(function (word) {
        return trimWord(word);
    })[0]];
}, function () {
    fs.writeFileSync(outputPath, JSON.stringify(results));
});