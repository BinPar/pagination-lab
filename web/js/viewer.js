/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/getDomUI.js":
/*!**************************!*\
  !*** ./dist/getDomUI.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\n/**\n * Internal dictionary of elements\n */\nvar elements;\n/**\n * Adds the element only if the dom node exists\n * @param name name to the elemento to add\n * @param item dom node\n */\nexports.addToMap = function (name, item) {\n    if (item) {\n        elements.set(name, item);\n    }\n};\n/**\n * Gets the user interface elements from the DOM of the current page\n */\nvar getDomUI = function () {\n    if (!elements) {\n        elements = new Map();\n        exports.addToMap('pageNumberBtn', document.getElementById('pageNumber'));\n        exports.addToMap('zoomPanel', document.body.querySelector('body > .zoomPanel'));\n        exports.addToMap('buttonsPanel', document.body.querySelector('body > .buttons'));\n        exports.addToMap('fullScreenModeButton', document.body.querySelector('body > .buttons > .fullScreenModeButton'));\n        exports.addToMap('increaseFontButton', document.body.querySelector('body > .buttons > .increaseFontButton'));\n        exports.addToMap('decreaseFontButton', document.body.querySelector('body > .buttons > .decreaseFontButton'));\n        exports.addToMap('increaseLineHeight', document.body.querySelector('body > .buttons > .increaseLineHeight'));\n        exports.addToMap('decreaseLineHeight', document.body.querySelector('body > .buttons > .decreaseLineHeight'));\n        exports.addToMap('nightModeButton', document.body.querySelector('body > .buttons > .nightModeButton'));\n        exports.addToMap('sepiaModeButton', document.body.querySelector('body > .buttons > .sepiaModeButton'));\n        exports.addToMap('verticalScrollButton', document.body.querySelector('body > .buttons > .verticalScrollButton'));\n    }\n    return {\n        pageNumberBtn: elements.get('pageNumberBtn'),\n        zoomPanel: elements.get('zoomPanel'),\n        buttonsPanel: elements.get('buttonsPanel'),\n        fullScreenModeButton: elements.get('fullScreenModeButton'),\n        increaseFontButton: elements.get('increaseFontButton'),\n        decreaseFontButton: elements.get('decreaseFontButton'),\n        increaseLineHeight: elements.get('increaseLineHeight'),\n        decreaseLineHeight: elements.get('decreaseLineHeight'),\n        nightModeButton: elements.get('nightModeButton'),\n        sepiaModeButton: elements.get('sepiaModeButton'),\n        verticalScrollButton: elements.get('verticalScrollButton')\n    };\n};\nexports[\"default\"] = getDomUI;\n\n\n//# sourceURL=webpack:///./dist/getDomUI.js?");

/***/ }),

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar recalculateColumnConfig_1 = __webpack_require__(/*! ./recalculateColumnConfig */ \"./dist/recalculateColumnConfig.js\");\nvar settings_1 = __webpack_require__(/*! ./settings */ \"./dist/settings.js\");\nvar getDomUI_1 = __webpack_require__(/*! ./getDomUI */ \"./dist/getDomUI.js\");\nvar setupGeneralEvents_1 = __webpack_require__(/*! ./setupGeneralEvents */ \"./dist/setupGeneralEvents.js\");\nvar setupButtonsEvents_1 = __webpack_require__(/*! ./setupButtonsEvents */ \"./dist/setupButtonsEvents.js\");\n/**\n * All the sistem is setup when the window loads\n */\nvar onWindowLoad = function () {\n    var domUI = getDomUI_1[\"default\"]();\n    setupGeneralEvents_1[\"default\"]();\n    setupButtonsEvents_1[\"default\"]();\n    document.documentElement.style.setProperty('--fontSize', settings_1.getSettings().currentFontSize + \"px\");\n    /**\n     * The click togles the mode (read mode or buttons)\n     */\n    document.body.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        if (settings_1.getSettings().animateEnabled) {\n            settings_1.updateSettings({ readMode: !settings_1.getSettings().readMode });\n            if (domUI.zoomPanel && domUI.buttonsPanel) {\n                if (!settings_1.getSettings().verticalScroll) {\n                    settings_1.updateSettings({ animateEnabled: false });\n                    document.documentElement.style.setProperty('--viewerSnapType', \"none\");\n                    if (settings_1.getSettings().readMode) {\n                        var scrollFix = (document.body.scrollLeft * -1) / 3;\n                        settings_1.updateSettings({ scrollFix: scrollFix });\n                        document.documentElement.style.setProperty('--horizontalScrollFix', settings_1.getSettings().scrollFix + \"px\");\n                    }\n                    else {\n                        var scrollFix = document.body.scrollLeft * 0.25;\n                        settings_1.updateSettings({ scrollFix: scrollFix });\n                        document.documentElement.style.setProperty('--horizontalScrollFix', settings_1.getSettings().scrollFix + \"px\");\n                    }\n                    settings_1.updateSettings({ handleZoomAnimation: true });\n                    domUI.zoomPanel.className = \"zoomPanel\" + (settings_1.getSettings().readMode ? ' zoom' : '');\n                }\n                domUI.buttonsPanel.className = \"buttons\" + (settings_1.getSettings().readMode ? ' zoom' : '');\n            }\n        }\n    });\n    /**\n     * When a new font is loaded we need to recalc the colum configuration\n     */\n    if (document.fonts && document.fonts.ready) {\n        document.fonts.ready.then(function () {\n            recalculateColumnConfig_1[\"default\"](true);\n        })[\"catch\"](function (err) {\n            // eslint-disable-next-line no-console\n            console.error(err);\n        });\n    }\n    /**\n     * Events to detect when the zoom animation is ended\n     */\n    [\n        'webkitTransitionEnd',\n        'otransitionend',\n        'oTransitionEnd',\n        'msTransitionEnd',\n        'transitionend',\n    ].forEach(function (eventName) {\n        var _a;\n        (_a = domUI.zoomPanel) === null || _a === void 0 ? void 0 : _a.addEventListener(eventName, function () {\n            if (settings_1.getSettings().handleZoomAnimation) {\n                settings_1.updateSettings({ handleZoomAnimation: false });\n                var newScrollX_1 = document.body.scrollLeft - settings_1.getSettings().scrollFix;\n                document.body.scrollTo(newScrollX_1, 0);\n                settings_1.updateSettings({ scrollFix: 0 });\n                document.documentElement.style.setProperty('--animationSpeed', \"0s\");\n                document.documentElement.style.setProperty('--horizontalScrollFix', settings_1.getSettings().scrollFix + \"px\");\n                recalculateColumnConfig_1[\"default\"](false);\n                /**\n                 * If we wait to the next screen render frame it avoids the visual jump on the scroll\n                 * works impresibly well\n                 */\n                window.requestAnimationFrame(function () {\n                    document.documentElement.style.setProperty('--animationSpeed', \"0.5s\");\n                    document.documentElement.style.setProperty('--viewerSnapType', \"x mandatory\");\n                    settings_1.updateSettings({ animateEnabled: true });\n                    document.body.scrollTo(newScrollX_1, 0);\n                });\n            }\n        }, false);\n    });\n    if (domUI.zoomPanel) {\n        domUI.zoomPanel.style.marginTop = '0';\n    }\n};\n/**\n * We need to recalc the columns on resize\n */\nwindow.addEventListener('resize', function () {\n    recalculateColumnConfig_1[\"default\"](true);\n});\n/**\n * Main entry point\n */\nwindow.addEventListener('load', onWindowLoad);\n\n\n//# sourceURL=webpack:///./dist/index.js?");

/***/ }),

/***/ "./dist/recalculateColumnConfig.js":
/*!*****************************************!*\
  !*** ./dist/recalculateColumnConfig.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nexports.__esModule = true;\nvar settings_1 = __webpack_require__(/*! ./settings */ \"./dist/settings.js\");\nvar recalculateColumnConfig = function (updateScroll) {\n    if (updateScroll === void 0) { updateScroll = false; }\n    var _a;\n    var newSettings = __assign({}, settings_1.getSettings());\n    var labelsContainer = document.body.querySelector('body > .zoomPanel > .labelsForEveryPage');\n    var pageSnapsContainer = document.body.querySelector('body > .pageSnaps');\n    document.body\n        .querySelectorAll('body > .zoomPanel >.labelsForEveryPage > .label')\n        .forEach(function (label) {\n        label.remove();\n    });\n    document.body\n        .querySelectorAll('body > .pageSnaps > .scrollSnap')\n        .forEach(function (label) {\n        label.remove();\n    });\n    var windowWidth = window.innerWidth;\n    var vh = window.innerHeight;\n    document.documentElement.style.setProperty('--totalChapterWidth', '0');\n    document.documentElement.style.setProperty('--vh', vh + \"px\");\n    document.documentElement.style.setProperty('--windowWidth', 0 + \"px\");\n    document.documentElement.style.setProperty('--totalColumnWidth', \"0\");\n    var totalColumnWidthCalculator = ((_a = document.getElementById('totalColumnWidthCalculator')) === null || _a === void 0 ? void 0 : _a.clientWidth) || 1;\n    var columnWidth = totalColumnWidthCalculator + 36;\n    var columnsInPageWidth = Math.floor(windowWidth / columnWidth);\n    var totalColumnWidth = windowWidth / columnsInPageWidth;\n    var bodyScrollWidth = document.body.scrollWidth;\n    if (!settings_1.getSettings().readMode) {\n        bodyScrollWidth -= (window.innerWidth / 2) * 0.25;\n    }\n    var bodyWidth = bodyScrollWidth * (settings_1.getSettings().readMode ? 1 : 1 / 0.75);\n    var totalColumns = Math.round(bodyWidth / totalColumnWidth);\n    document.documentElement.style.setProperty('--totalColumnWidth', totalColumnWidth + \"px\");\n    var totalChapterWidth = totalColumnWidth * totalColumns;\n    var scrollingElement = document.body;\n    document.documentElement.style.setProperty('--totalChapterWidth', totalChapterWidth + \"px\");\n    var pagesDict = [];\n    var pagesPerColumn = [];\n    var verticalPageMarkers = [];\n    var setScrollTo = 0;\n    if (settings_1.getSettings().verticalScroll) {\n        var scrollTop_1 = (document.scrollingElement || document.body).scrollTop;\n        document.body\n            .querySelectorAll('body > .zoomPanel > .chapterWrapper [data-page]')\n            .forEach(function (item) {\n            var element = item;\n            var rects = element.getClientRects();\n            var top = rects[0].y;\n            top += scrollTop_1;\n            verticalPageMarkers.push({\n                top: top,\n                page: element.dataset.page\n            });\n        });\n    }\n    else {\n        var scrollLeft_1 = document.body.scrollLeft;\n        document.body\n            .querySelectorAll('body > .zoomPanel > .chapterWrapper [data-page]')\n            .forEach(function (item) {\n            var element = item;\n            var rects = element.getClientRects();\n            var left = rects[0].x;\n            if (!settings_1.getSettings().readMode) {\n                left -= (window.innerWidth / 2) * 0.25;\n                left += scrollLeft_1;\n                left /= 0.75;\n            }\n            else {\n                left += scrollLeft_1;\n            }\n            if (element.dataset.page) {\n                pagesDict.push({\n                    left: left,\n                    page: element.dataset.page\n                });\n            }\n        });\n        var currentPage = pagesDict.length ? pagesDict[0].page : '';\n        var nextPage = '';\n        if (newSettings.currentPage === '') {\n            newSettings.currentPage = currentPage;\n        }\n        var pageSet = false;\n        setScrollTo = scrollingElement.scrollLeft;\n        for (var column = 1; column <= totalColumns; column++) {\n            var relativeColumnWidth = totalColumnWidth;\n            if (!settings_1.getSettings().readMode) {\n                relativeColumnWidth *= 0.75;\n            }\n            var maxLeft = column * totalColumnWidth;\n            if (column === 1 || column > totalColumns - 1) {\n                currentPage = '';\n            }\n            else if (pagesDict.length && pagesDict[0].left < maxLeft) {\n                currentPage = pagesDict[0].page;\n                nextPage = currentPage;\n                while (pagesDict.length && pagesDict[0].left < maxLeft) {\n                    if (!pageSet && newSettings.currentPage === pagesDict[0].page) {\n                        if (currentPage === newSettings.currentPage) {\n                            pageSet = true;\n                        }\n                        setScrollTo = column * relativeColumnWidth - relativeColumnWidth;\n                    }\n                    var removed = pagesDict.shift();\n                    if (removed) {\n                        nextPage = removed.page;\n                    }\n                }\n            }\n            if (currentPage === '-') {\n                currentPage = '';\n            }\n            pagesPerColumn.push(currentPage);\n            var columnDiv = document.createElement('div');\n            columnDiv.className = 'label';\n            var label = document.createElement('p');\n            label.innerText = \"\" + currentPage;\n            columnDiv.appendChild(label);\n            labelsContainer === null || labelsContainer === void 0 ? void 0 : labelsContainer.appendChild(columnDiv);\n            var isScrollSnap = (column - 2) % columnsInPageWidth === 0;\n            if (isScrollSnap && currentPage) {\n                var scrollSnapDiv = document.createElement('div');\n                scrollSnapDiv.className = 'scrollSnap';\n                if (newSettings.readMode) {\n                    scrollSnapDiv.style.left = (column - 1) * totalColumnWidth + \"px\";\n                }\n                else {\n                    scrollSnapDiv.style.left = (column - 1) * (totalColumnWidth * 0.75) + \"px\";\n                }\n                pageSnapsContainer === null || pageSnapsContainer === void 0 ? void 0 : pageSnapsContainer.appendChild(scrollSnapDiv);\n            }\n            currentPage = nextPage;\n        }\n    }\n    if (updateScroll) {\n        document.body.scrollTo(setScrollTo, 0);\n    }\n    newSettings.columnWidth = totalColumnWidth;\n    newSettings.totalColumns = totalColumns;\n    newSettings.pagesPerColumn = pagesPerColumn;\n    newSettings.verticalPageMarkers = verticalPageMarkers;\n    settings_1.updateSettings(newSettings);\n};\nexports[\"default\"] = recalculateColumnConfig;\n\n\n//# sourceURL=webpack:///./dist/recalculateColumnConfig.js?");

/***/ }),

/***/ "./dist/settings.js":
/*!**************************!*\
  !*** ./dist/settings.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nexports.__esModule = true;\n/**\n * Viwewer defauilt settings\n */\nvar initialSettings = {\n    currentFontSize: 18,\n    columnWidth: 0,\n    totalColumns: 0,\n    scrollFix: 0,\n    currentPage: '',\n    pagesPerColumn: [],\n    readMode: true,\n    animateEnabled: true,\n    invertViewerColor: false,\n    sepiaViewerColor: false,\n    lineHeight: 1.5,\n    verticalScroll: false,\n    currentFont: 'baskerville-enc',\n    verticalPageMarkers: [],\n    handleZoomAnimation: false\n};\n/**\n * Current setting value\n */\nvar settings = initialSettings;\n/**\n * Reset settings to the initial value\n * @returns {Settings} current settings\n */\nexports.resetSettings = function () {\n    settings = initialSettings;\n    return settings;\n};\n/**\n * Gets current settings value\n * @returns {Settings} current settings\n */\nexports.getSettings = function () { return settings; };\n/**\n * Updates the settings to a new value\n * @param newSettings {Partial<Settings>} new settings values to set\n * @returns {Settings} current settings\n */\nexports.updateSettings = function (newSettings) {\n    settings = __assign(__assign({}, settings), newSettings);\n    return settings;\n};\n\n\n//# sourceURL=webpack:///./dist/settings.js?");

/***/ }),

/***/ "./dist/setupButtonsEvents.js":
/*!************************************!*\
  !*** ./dist/setupButtonsEvents.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar settings_1 = __webpack_require__(/*! ./settings */ \"./dist/settings.js\");\nvar recalculateColumnConfig_1 = __webpack_require__(/*! ./recalculateColumnConfig */ \"./dist/recalculateColumnConfig.js\");\nvar getDomUI_1 = __webpack_require__(/*! ./getDomUI */ \"./dist/getDomUI.js\");\nvar updateFontInfo_1 = __webpack_require__(/*! ./updateFontInfo */ \"./dist/updateFontInfo.js\");\n/**\n * Setups all the buttons actions\n */\nvar setupButtonsEvents = function () {\n    var _a, _b, _c, _d, _e, _f, _g, _h;\n    var domUI = getDomUI_1[\"default\"]();\n    /**\n     * Vertical / horizontal reading togle\n     */\n    (_a = domUI.verticalScrollButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        ev.stopPropagation();\n        settings_1.updateSettings({ verticalScroll: !settings_1.getSettings().verticalScroll });\n        document.body.className = \"viewer epub \" + settings_1.getSettings().currentFont + (settings_1.getSettings().verticalScroll ? ' vertical' : '');\n        if (settings_1.getSettings().verticalScroll) {\n            document.documentElement.style.setProperty('--animationSpeed', \"0s\");\n            document.documentElement.style.overflowY = 'auto';\n            document.documentElement.style.overflowX = 'none';\n            document.documentElement.scrollTo(0, 0);\n            document.body.scrollTo(0, 0);\n            setTimeout(function () {\n                var pageIndicator = document.body.querySelector(\"body > .zoomPanel > .chapterWrapper [data-page=\\\"\" + settings_1.getSettings().currentPage + \"\\\"]\");\n                if (pageIndicator) {\n                    document.documentElement.scrollTo(0, pageIndicator.getBoundingClientRect().top);\n                }\n                recalculateColumnConfig_1[\"default\"](true);\n            }, 0);\n        }\n        else {\n            document.documentElement.scrollTo(0, 0);\n            document.body.scrollTo(0, 0);\n            document.documentElement.style.setProperty('--animationSpeed', \"0.5s\");\n            document.documentElement.style.overflowY = 'hidden';\n            document.documentElement.style.overflowX = 'hidden';\n            recalculateColumnConfig_1[\"default\"](true);\n            settings_1.updateSettings({ readMode: true });\n            if (domUI.zoomPanel && domUI.buttonsPanel) {\n                document.documentElement.style.setProperty('--viewerSnapType', \"none\");\n                var scrollFix = (document.body.scrollLeft * -1) / 3;\n                settings_1.updateSettings({ scrollFix: scrollFix, animateEnabled: false });\n                document.documentElement.style.setProperty('--horizontalScrollFix', settings_1.getSettings().scrollFix + \"px\");\n                settings_1.updateSettings({ handleZoomAnimation: true });\n                domUI.zoomPanel.className = \"zoomPanel\" + (settings_1.getSettings().readMode ? ' zoom' : '');\n                domUI.buttonsPanel.className = \"buttons\" + (settings_1.getSettings().readMode ? ' zoom' : '');\n            }\n        }\n    });\n    /**\n     * Full Screen Mode\n     */\n    (_b = domUI.fullScreenModeButton) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        ev.stopPropagation();\n        if (document.fullscreenElement) {\n            document.exitFullscreen();\n        }\n        else {\n            document.body.requestFullscreen();\n        }\n    });\n    /**\n     * Night Mode Toggle\n     */\n    (_c = domUI.nightModeButton) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        ev.stopPropagation();\n        if (!settings_1.getSettings().handleZoomAnimation) {\n            var invertViewerColor = settings_1.getSettings().invertViewerColor;\n            invertViewerColor = !invertViewerColor;\n            settings_1.updateSettings({ invertViewerColor: invertViewerColor });\n            document.documentElement.style.setProperty('--invertViewerColor', \"\" + (invertViewerColor ? 1 : 0));\n        }\n    });\n    /**\n     * Sepia Mode Toggle\n     */\n    (_d = domUI.sepiaModeButton) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        ev.stopPropagation();\n        if (!settings_1.getSettings().handleZoomAnimation) {\n            var sepiaViewerColor = settings_1.getSettings().sepiaViewerColor;\n            sepiaViewerColor = !sepiaViewerColor;\n            settings_1.updateSettings({ sepiaViewerColor: sepiaViewerColor });\n            document.documentElement.style.setProperty('--sepiaViewerColor', \"\" + (sepiaViewerColor ? 1 : 0));\n            document.documentElement.style.setProperty('--contrastViewerColor', \"\" + (sepiaViewerColor ? 0.6 : 1));\n        }\n    });\n    /**\n     * Increase font size\n     */\n    (_e = domUI.increaseFontButton) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        ev.stopPropagation();\n        var currentFontSize = settings_1.getSettings().currentFontSize;\n        if (currentFontSize < 32) {\n            currentFontSize += 2;\n            settings_1.updateSettings({ currentFontSize: currentFontSize });\n            updateFontInfo_1[\"default\"]();\n        }\n    });\n    /**\n     * Decrease font size\n     */\n    (_f = domUI.decreaseFontButton) === null || _f === void 0 ? void 0 : _f.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        ev.stopPropagation();\n        var currentFontSize = settings_1.getSettings().currentFontSize;\n        if (currentFontSize > 8) {\n            currentFontSize -= 2;\n            settings_1.updateSettings({ currentFontSize: currentFontSize });\n            updateFontInfo_1[\"default\"]();\n        }\n    });\n    /**\n     * Increase line height\n     */\n    (_g = domUI.increaseLineHeight) === null || _g === void 0 ? void 0 : _g.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        ev.stopPropagation();\n        var lineHeight = settings_1.getSettings().lineHeight;\n        if (lineHeight < 2) {\n            lineHeight += 0.1;\n            settings_1.updateSettings({ lineHeight: lineHeight });\n            updateFontInfo_1[\"default\"]();\n        }\n    });\n    /**\n     * Decrease line height\n     */\n    (_h = domUI.decreaseLineHeight) === null || _h === void 0 ? void 0 : _h.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        ev.stopPropagation();\n        var lineHeight = settings_1.getSettings().lineHeight;\n        if (lineHeight > 1) {\n            lineHeight -= 0.1;\n            settings_1.updateSettings({ lineHeight: lineHeight });\n            updateFontInfo_1[\"default\"]();\n        }\n    });\n    /**\n     * Typography selection\n     */\n    document.body\n        .querySelectorAll('body > .buttons > .selectTypography')\n        .forEach(function (button) {\n        button === null || button === void 0 ? void 0 : button.addEventListener('click', function (ev) {\n            ev.preventDefault();\n            ev.stopPropagation();\n            settings_1.updateSettings({ currentFont: button.value });\n            document.body.className = \"viewer epub \" + settings_1.getSettings().currentFont + (settings_1.getSettings().verticalScroll ? ' vertical' : '');\n            updateFontInfo_1[\"default\"]();\n        });\n    });\n};\nexports[\"default\"] = setupButtonsEvents;\n\n\n//# sourceURL=webpack:///./dist/setupButtonsEvents.js?");

/***/ }),

/***/ "./dist/setupGeneralEvents.js":
/*!************************************!*\
  !*** ./dist/setupGeneralEvents.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar settings_1 = __webpack_require__(/*! ./settings */ \"./dist/settings.js\");\nvar getDomUI_1 = __webpack_require__(/*! ./getDomUI */ \"./dist/getDomUI.js\");\nvar setupGeneralEvents = function () {\n    var domUI = getDomUI_1[\"default\"]();\n    var onBodyScroll = function (ev) {\n        if (settings_1.getSettings().animateEnabled && !settings_1.getSettings().verticalScroll) {\n            var columnWidth = settings_1.getSettings().columnWidth;\n            if (!settings_1.getSettings().readMode) {\n                columnWidth *= 0.75;\n            }\n            var currentColumn = Math.round((document.body.scrollLeft - settings_1.getSettings().scrollFix) / columnWidth);\n            if (currentColumn < settings_1.getSettings().pagesPerColumn.length) {\n                settings_1.updateSettings({ currentPage: settings_1.getSettings().pagesPerColumn[currentColumn] });\n            }\n            if (domUI.pageNumberBtn) {\n                domUI.pageNumberBtn.innerText = settings_1.getSettings().currentPage;\n            }\n        }\n        else if (settings_1.getSettings().animateEnabled) {\n            var scrollTop_1 = (document.scrollingElement || document.body).scrollTop;\n            var currentMarker = settings_1.getSettings().verticalPageMarkers.find(function (item) { return scrollTop_1 <= item.top; });\n            if (currentMarker) {\n                settings_1.getSettings().currentPage = currentMarker.page;\n                if (domUI.pageNumberBtn) {\n                    domUI.pageNumberBtn.innerText = settings_1.getSettings().currentPage;\n                }\n            }\n        }\n        else {\n            ev.preventDefault();\n        }\n    };\n    window.addEventListener('touchmove', function (ev) {\n        if (!settings_1.getSettings().animateEnabled || ev.targetTouches.length > 1) {\n            ev.preventDefault();\n            ev.stopImmediatePropagation();\n        }\n    }, { passive: false });\n    window.addEventListener('touchstart', function (ev) {\n        if (ev.targetTouches.length > 1) {\n            ev.preventDefault();\n            ev.stopImmediatePropagation();\n        }\n    }, { passive: false });\n    document.body.addEventListener('scroll', onBodyScroll);\n    document.addEventListener('scroll', onBodyScroll);\n};\nexports[\"default\"] = setupGeneralEvents;\n\n\n//# sourceURL=webpack:///./dist/setupGeneralEvents.js?");

/***/ }),

/***/ "./dist/updateFontInfo.js":
/*!********************************!*\
  !*** ./dist/updateFontInfo.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar settings_1 = __webpack_require__(/*! ./settings */ \"./dist/settings.js\");\nvar recalculateColumnConfig_1 = __webpack_require__(/*! ./recalculateColumnConfig */ \"./dist/recalculateColumnConfig.js\");\nvar updateFontInfo = function () {\n    document.documentElement.style.setProperty('--fontSize', settings_1.getSettings().currentFontSize + \"px\");\n    document.documentElement.style.setProperty('--lineHeight', settings_1.getSettings().lineHeight + \"em\");\n    recalculateColumnConfig_1[\"default\"](true);\n};\nexports[\"default\"] = updateFontInfo;\n\n\n//# sourceURL=webpack:///./dist/updateFontInfo.js?");

/***/ })

/******/ });