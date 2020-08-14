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

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar recalculateColumnConfig_1 = __webpack_require__(/*! ./recalculateColumnConfig */ \"./dist/recalculateColumnConfig.js\");\nvar settings = {\n    currentFontSize: 18,\n    columnWidth: 0,\n    totalColumns: 0,\n    scrollFix: 0,\n    currentPage: '',\n    pagesPerColumn: [],\n    readMode: true,\n    animateEnabled: true,\n    invertViewerColor: false,\n    sepiaViewerColor: false,\n    lineHeight: 1.5,\n    verticalScroll: false,\n    currentFont: 'baskerville-enc'\n};\nvar handleZoomAnimation = false;\nvar recalculate = function () {\n    settings = recalculateColumnConfig_1[\"default\"](settings, false);\n};\nvar recalculateAndScroll = function () {\n    settings = recalculateColumnConfig_1[\"default\"](settings, true);\n};\nvar pageNumberBtn;\nvar onBodyScroll = function (ev) {\n    if (settings.animateEnabled && !settings.verticalScroll) {\n        var columnWidth = settings.columnWidth;\n        if (!settings.readMode) {\n            columnWidth *= 0.75;\n        }\n        var currentColumn = Math.round((document.body.scrollLeft - settings.scrollFix) / columnWidth);\n        if (currentColumn < settings.pagesPerColumn.length) {\n            settings.currentPage = settings.pagesPerColumn[currentColumn];\n        }\n        if (pageNumberBtn) {\n            pageNumberBtn.innerText = settings.currentPage;\n        }\n    }\n    else {\n        ev.preventDefault();\n    }\n};\nwindow.addEventListener('touchmove', function (ev) {\n    if (!settings.animateEnabled || ev.targetTouches.length > 1) {\n        ev.preventDefault();\n        ev.stopImmediatePropagation();\n    }\n}, { passive: false });\nwindow.addEventListener('touchstart', function (ev) {\n    if (ev.targetTouches.length > 1) {\n        ev.preventDefault();\n        ev.stopImmediatePropagation();\n    }\n}, { passive: false });\nvar onWindowLoad = function () {\n    pageNumberBtn = document.getElementById('pageNumber');\n    document.documentElement.style.setProperty('--fontSize', settings.currentFontSize + \"px\");\n    var zoomPanel = document.body.querySelector('body > .zoomPanel');\n    var buttonsPanel = document.body.querySelector('body > .buttons');\n    var fullScreenModeButton = document.body.querySelector('body > .buttons > .fullScreenModeButton');\n    var increaseFontButton = document.body.querySelector('body > .buttons > .increaseFontButton');\n    var decreaseFontButton = document.body.querySelector('body > .buttons > .decreaseFontButton');\n    var increaseLineHeight = document.body.querySelector('body > .buttons > .increaseLineHeight');\n    var decreaseLineHeight = document.body.querySelector('body > .buttons > .decreaseLineHeight');\n    var nightModeButton = document.body.querySelector('body > .buttons > .nightModeButton');\n    var sepiaModeButton = document.body.querySelector('body > .buttons > .sepiaModeButton');\n    var verticalScrollButton = document.body.querySelector('body > .buttons > .verticalScrollButton');\n    var updateFontInfo = function () {\n        document.documentElement.style.setProperty('--fontSize', settings.currentFontSize + \"px\");\n        document.documentElement.style.setProperty('--lineHeight', settings.lineHeight + \"em\");\n        settings = recalculateColumnConfig_1[\"default\"](settings, true);\n    };\n    verticalScrollButton === null || verticalScrollButton === void 0 ? void 0 : verticalScrollButton.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        ev.stopPropagation();\n        settings.verticalScroll = !settings.verticalScroll;\n        document.body.className = \"viewer epub \" + settings.currentFont + (settings.verticalScroll ? ' vertical' : '');\n        if (settings.verticalScroll) {\n            document.documentElement.style.setProperty('--animationSpeed', \"0s\");\n            document.documentElement.style.overflowY = 'auto';\n            document.documentElement.style.overflowX = 'none';\n            document.documentElement.scrollTo(0, 0);\n            document.body.scrollTo(0, 0);\n            setTimeout(function () {\n                var pageIndicator = document.body.querySelector(\"body > .zoomPanel > .chapterWrapper [data-page=\\\"\" + settings.currentPage + \"\\\"]\");\n                if (pageIndicator) {\n                    document.documentElement.scrollTo(0, pageIndicator.getBoundingClientRect().top);\n                }\n            }, 0);\n        }\n        else {\n            document.documentElement.scrollTo(0, 0);\n            document.body.scrollTo(0, 0);\n            document.documentElement.style.setProperty('--animationSpeed', \"0.5s\");\n            document.documentElement.style.overflowY = 'hidden';\n            document.documentElement.style.overflowX = 'hidden';\n            settings = recalculateColumnConfig_1[\"default\"](settings, true);\n            settings.readMode = true;\n            if (zoomPanel && buttonsPanel) {\n                settings.animateEnabled = false;\n                document.documentElement.style.setProperty('--viewerSnapType', \"none\");\n                var scrollFix = (document.body.scrollLeft * -1) / 3;\n                settings.scrollFix = scrollFix;\n                document.documentElement.style.setProperty('--horizontalScrollFix', settings.scrollFix + \"px\");\n                handleZoomAnimation = true;\n                zoomPanel.className = \"zoomPanel\" + (settings.readMode ? ' zoom' : '');\n                buttonsPanel.className = \"buttons\" + (settings.readMode ? ' zoom' : '');\n            }\n        }\n    });\n    fullScreenModeButton === null || fullScreenModeButton === void 0 ? void 0 : fullScreenModeButton.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        ev.stopPropagation();\n        if (document.fullscreenElement) {\n            document.exitFullscreen();\n        }\n        else {\n            document.body.requestFullscreen();\n        }\n    });\n    nightModeButton === null || nightModeButton === void 0 ? void 0 : nightModeButton.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        ev.stopPropagation();\n        if (!handleZoomAnimation) {\n            settings.invertViewerColor = !settings.invertViewerColor;\n            document.documentElement.style.setProperty('--invertViewerColor', \"\" + (settings.invertViewerColor ? 1 : 0));\n        }\n    });\n    sepiaModeButton === null || sepiaModeButton === void 0 ? void 0 : sepiaModeButton.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        ev.stopPropagation();\n        if (!handleZoomAnimation) {\n            settings.sepiaViewerColor = !settings.sepiaViewerColor;\n            document.documentElement.style.setProperty('--sepiaViewerColor', \"\" + (settings.sepiaViewerColor ? 1 : 0));\n            document.documentElement.style.setProperty('--contrastViewerColor', \"\" + (settings.sepiaViewerColor ? 0.6 : 1));\n        }\n    });\n    increaseFontButton === null || increaseFontButton === void 0 ? void 0 : increaseFontButton.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        ev.stopPropagation();\n        if (settings.currentFontSize < 32) {\n            settings.currentFontSize += 2;\n            updateFontInfo();\n        }\n    });\n    decreaseFontButton === null || decreaseFontButton === void 0 ? void 0 : decreaseFontButton.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        ev.stopPropagation();\n        if (settings.currentFontSize > 8) {\n            settings.currentFontSize -= 2;\n            updateFontInfo();\n        }\n    });\n    increaseLineHeight === null || increaseLineHeight === void 0 ? void 0 : increaseLineHeight.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        ev.stopPropagation();\n        if (settings.lineHeight < 2) {\n            settings.lineHeight += 0.1;\n            updateFontInfo();\n        }\n    });\n    decreaseLineHeight === null || decreaseLineHeight === void 0 ? void 0 : decreaseLineHeight.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        ev.stopPropagation();\n        if (settings.lineHeight > 1) {\n            settings.lineHeight -= 0.1;\n            updateFontInfo();\n        }\n    });\n    document.body.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        if (settings.animateEnabled) {\n            settings.readMode = !settings.readMode;\n            if (zoomPanel && buttonsPanel) {\n                if (!settings.verticalScroll) {\n                    settings.animateEnabled = false;\n                    document.documentElement.style.setProperty('--viewerSnapType', \"none\");\n                    if (settings.readMode) {\n                        var scrollFix = (document.body.scrollLeft * -1) / 3;\n                        settings.scrollFix = scrollFix;\n                        document.documentElement.style.setProperty('--horizontalScrollFix', settings.scrollFix + \"px\");\n                    }\n                    else {\n                        var scrollFix = document.body.scrollLeft * 0.25;\n                        settings.scrollFix = scrollFix;\n                        document.documentElement.style.setProperty('--horizontalScrollFix', settings.scrollFix + \"px\");\n                    }\n                    handleZoomAnimation = true;\n                    zoomPanel.className = \"zoomPanel\" + (settings.readMode ? ' zoom' : '');\n                }\n                buttonsPanel.className = \"buttons\" + (settings.readMode ? ' zoom' : '');\n            }\n        }\n    });\n    document.body.addEventListener('scroll', onBodyScroll);\n    if (document.fonts && document.fonts.ready) {\n        document.fonts.ready.then(function () {\n            recalculateAndScroll();\n        });\n    }\n    document.body\n        .querySelectorAll('body > .buttons > .selectTypography')\n        .forEach(function (button) {\n        button === null || button === void 0 ? void 0 : button.addEventListener('click', function (ev) {\n            ev.preventDefault();\n            ev.stopPropagation();\n            settings.currentFont = button.value;\n            document.body.className = \"viewer epub \" + settings.currentFont + (settings.verticalScroll ? ' vertical' : '');\n            updateFontInfo();\n        });\n    });\n    [\n        'webkitTransitionEnd',\n        'otransitionend',\n        'oTransitionEnd',\n        'msTransitionEnd',\n        'transitionend',\n    ].forEach(function (eventName) {\n        zoomPanel.addEventListener(eventName, function () {\n            if (handleZoomAnimation) {\n                handleZoomAnimation = false;\n                var newScrollX_1 = document.body.scrollLeft - settings.scrollFix;\n                document.body.scrollTo(newScrollX_1, 0);\n                settings.scrollFix = 0;\n                document.documentElement.style.setProperty('--animationSpeed', \"0s\");\n                document.documentElement.style.setProperty('--horizontalScrollFix', settings.scrollFix + \"px\");\n                recalculate();\n                window.requestAnimationFrame(function () {\n                    document.documentElement.style.setProperty('--animationSpeed', \"0.5s\");\n                    document.documentElement.style.setProperty('--viewerSnapType', \"x mandatory\");\n                    settings.animateEnabled = true;\n                    document.body.scrollTo(newScrollX_1, 0);\n                });\n            }\n        }, false);\n    });\n};\nwindow.addEventListener('load', onWindowLoad);\nwindow.addEventListener('resize', recalculateAndScroll);\n\n\n//# sourceURL=webpack:///./dist/index.js?");

/***/ }),

/***/ "./dist/recalculateColumnConfig.js":
/*!*****************************************!*\
  !*** ./dist/recalculateColumnConfig.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nexports.__esModule = true;\nvar recalculateColumnConfig = function (settings, updateScroll) {\n    if (updateScroll === void 0) { updateScroll = false; }\n    var _a;\n    var newSettings = __assign({}, settings);\n    var labelsContainer = document.body.querySelector('body > .zoomPanel > .labelsForEveryPage');\n    var pageSnapsContainer = document.body.querySelector('body > .pageSnaps');\n    document.body\n        .querySelectorAll('body > .zoomPanel >.labelsForEveryPage > .label')\n        .forEach(function (label) {\n        label.remove();\n    });\n    document.body\n        .querySelectorAll('body > .pageSnaps > .scrollSnap')\n        .forEach(function (label) {\n        label.remove();\n    });\n    var windowWidth = window.innerWidth;\n    var vh = window.innerHeight;\n    document.documentElement.style.setProperty('--totalChapterWidth', '0');\n    document.documentElement.style.setProperty('--vh', vh + \"px\");\n    document.documentElement.style.setProperty('--windowWidth', 0 + \"px\");\n    document.documentElement.style.setProperty('--totalColumnWidth', \"0\");\n    var totalColumnWidthCalculator = ((_a = document.getElementById('totalColumnWidthCalculator')) === null || _a === void 0 ? void 0 : _a.clientWidth) || 1;\n    var columnWidth = totalColumnWidthCalculator + 36;\n    var columnsInPageWidth = Math.floor(windowWidth / columnWidth);\n    var totalColumnWidth = windowWidth / columnsInPageWidth;\n    var bodyScrollWidth = document.body.scrollWidth;\n    if (!settings.readMode) {\n        bodyScrollWidth -= (window.innerWidth / 2) * 0.25;\n    }\n    var bodyWidth = bodyScrollWidth * (settings.readMode ? 1 : 1 / 0.75);\n    var totalColumns = Math.round(bodyWidth / totalColumnWidth);\n    document.documentElement.style.setProperty('--totalColumnWidth', totalColumnWidth + \"px\");\n    var totalChapterWidth = totalColumnWidth * totalColumns;\n    var scrollingElement = document.body;\n    document.documentElement.style.setProperty('--totalChapterWidth', totalChapterWidth + \"px\");\n    var pagesDict = [];\n    var pagesPerColumn = [];\n    var scrollLeft = document.body.scrollLeft;\n    document.body\n        .querySelectorAll('body > .zoomPanel > .chapterWrapper [data-page]')\n        .forEach(function (item) {\n        var element = item;\n        var rects = element.getClientRects();\n        var left = rects[0].x;\n        if (!settings.readMode) {\n            left -= (window.innerWidth / 2) * 0.25;\n            left += scrollLeft;\n            left /= 0.75;\n        }\n        else {\n            left += scrollLeft;\n        }\n        if (element.dataset.page) {\n            pagesDict.push({\n                left: left,\n                page: element.dataset.page\n            });\n        }\n    });\n    var currentPage = pagesDict.length ? pagesDict[0].page : '';\n    var nextPage = '';\n    if (newSettings.currentPage === '') {\n        newSettings.currentPage = currentPage;\n    }\n    var pageSet = false;\n    var setScrollTo = scrollingElement.scrollLeft;\n    for (var column = 1; column <= totalColumns; column++) {\n        var relativeColumnWidth = totalColumnWidth;\n        if (!settings.readMode) {\n            relativeColumnWidth *= 0.75;\n        }\n        var maxLeft = column * totalColumnWidth;\n        if (column === 1 || column > totalColumns - 1) {\n            currentPage = '';\n        }\n        else if (pagesDict.length && pagesDict[0].left < maxLeft) {\n            currentPage = pagesDict[0].page;\n            nextPage = currentPage;\n            while (pagesDict.length && pagesDict[0].left < maxLeft) {\n                if (!pageSet && newSettings.currentPage === pagesDict[0].page) {\n                    if (currentPage === newSettings.currentPage) {\n                        pageSet = true;\n                    }\n                    setScrollTo = column * relativeColumnWidth - relativeColumnWidth;\n                }\n                var removed = pagesDict.shift();\n                if (removed) {\n                    nextPage = removed.page;\n                }\n            }\n        }\n        if (currentPage === '-') {\n            currentPage = '';\n        }\n        pagesPerColumn.push(currentPage);\n        var columnDiv = document.createElement('div');\n        columnDiv.className = 'label';\n        var label = document.createElement('p');\n        label.innerText = \"\" + currentPage;\n        columnDiv.appendChild(label);\n        labelsContainer === null || labelsContainer === void 0 ? void 0 : labelsContainer.appendChild(columnDiv);\n        var isScrollSnap = (column - 2) % columnsInPageWidth === 0;\n        if (isScrollSnap && currentPage) {\n            var scrollSnapDiv = document.createElement('div');\n            scrollSnapDiv.className = 'scrollSnap';\n            if (newSettings.readMode) {\n                scrollSnapDiv.style.left = (column - 1) * totalColumnWidth + \"px\";\n            }\n            else {\n                scrollSnapDiv.style.left = (column - 1) * (totalColumnWidth * 0.75) + \"px\";\n            }\n            pageSnapsContainer === null || pageSnapsContainer === void 0 ? void 0 : pageSnapsContainer.appendChild(scrollSnapDiv);\n        }\n        currentPage = nextPage;\n    }\n    if (updateScroll) {\n        document.body.scrollTo(setScrollTo, 0);\n    }\n    newSettings.columnWidth = totalColumnWidth;\n    newSettings.totalColumns = totalColumns;\n    newSettings.pagesPerColumn = pagesPerColumn;\n    return newSettings;\n};\nexports[\"default\"] = recalculateColumnConfig;\n\n\n//# sourceURL=webpack:///./dist/recalculateColumnConfig.js?");

/***/ })

/******/ });