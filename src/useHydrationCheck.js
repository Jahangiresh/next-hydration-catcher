"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHydrationCheck = void 0;
// src/useHydrationCheck.ts
var react_1 = require("react");
var checkHydration_1 = require("./checkHydration");
var useHydrationCheck = function (_a) {
    var componentName = _a.componentName;
    (0, react_1.useEffect)(function () {
        var _a;
        var htmlContent = (_a = document.querySelector("#".concat(componentName))) === null || _a === void 0 ? void 0 : _a.outerHTML;
        if (htmlContent) {
            var hydrationErrors = (0, checkHydration_1.checkHydration)(htmlContent);
            if (hydrationErrors.length > 0) {
                console.error("Hydration errors in ".concat(componentName, ":"), hydrationErrors);
            }
        }
    }, [componentName]);
};
exports.useHydrationCheck = useHydrationCheck;
