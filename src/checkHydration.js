"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHydration = void 0;
var jsdom_1 = require("jsdom");
function checkHydration(html) {
    var dom = new jsdom_1.JSDOM(html);
    var document = dom.window.document;
    var errors = [];
    function traverse(node) {
        if (node.tagName === "DIV" &&
            node.parentElement &&
            (node.parentElement.tagName === "P" ||
                node.parentElement.tagName === "SPAN")) {
            errors.push({
                message: "Hydration Error: Found <div> inside <p> or <span> tag.",
                location: node.outerHTML,
            });
        }
        if ((node.tagName === "P" || node.tagName === "SPAN") &&
            node.parentElement &&
            node.parentElement.tagName === "DIV") {
            errors.push({
                message: "Hydration Error: Found <".concat(node.tagName.toLowerCase(), "> inside <div> tag."),
                location: node.outerHTML,
            });
        }
        if (node.tagName === "SPAN" &&
            node.parentElement &&
            node.parentElement.tagName === "P") {
            errors.push({
                message: "Hydration Error: Found <span> inside <p> tag.",
                location: node.outerHTML,
            });
        }
        if ((node.tagName === "A" || node.tagName === "BUTTON") &&
            node.parentElement &&
            node.parentElement.tagName === "P") {
            errors.push({
                message: "Hydration Error: Found <".concat(node.tagName.toLowerCase(), "> inside <p> tag."),
                location: node.outerHTML,
            });
        }
        if (node.childNodes) {
            node.childNodes.forEach(traverse);
        }
    }
    traverse(document);
    return errors;
}
exports.checkHydration = checkHydration;
