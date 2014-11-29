// LICENSE : MIT
"use strict";
function GM_addStyle(aCss) {
    var head = document.getElementsByTagName('head')[0];
    if (head) {
        var style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.textContent = aCss;
        head.appendChild(style);
        return style;
    }
    return null;
}
module.exports = GM_addStyle;