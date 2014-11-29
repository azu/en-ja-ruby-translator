// LICENSE : MIT
"use strict";


function lookupNode(node) {
    var nameReg = /^(#text|PRE|CODE|SPAN|P)$/;
    var nodeName = node.nodeName;
    if (nameReg.test(nodeName)) {
        return lookupNode(node.parentNode);
    }
    return node;
}
/*
    find article(main) element from selected element
 */
function findAncestorContainer() {
    var selection = getSelection();
    var range = selection.getRangeAt(0);
    if (!selection.rangeCount) {
        return null;
    }
    var commonAncestorContainer = range.commonAncestorContainer;
    if (commonAncestorContainer == null) {
        return null;
    }
    return lookupNode(commonAncestorContainer);
}

module.exports = findAncestorContainer;
