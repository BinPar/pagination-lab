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
eval("\nexports.__esModule = true;\nvar currentFontSize = 18;\nvar recalculateColumnConfig = function () {\n    var _a;\n    var labelsContainer = document.body.querySelector('body > .labelsForEveryPage');\n    document.body\n        .querySelectorAll('body > .labelsForEveryPage > .label')\n        .forEach(function (label) {\n        label.remove();\n    });\n    var windowWidth = window.innerWidth;\n    var vh = window.innerHeight;\n    document.documentElement.style.setProperty('--totalChapterWidth', '0');\n    document.documentElement.style.setProperty('--vh', vh + \"px\");\n    document.documentElement.style.setProperty('--windowWidth', 0 + \"px\");\n    document.documentElement.style.setProperty('--totalColumnWidth', \"0\");\n    var columnWidth = ((_a = document.getElementById('totalColumnWidthCalculator')) === null || _a === void 0 ? void 0 : _a.clientWidth) || 1;\n    var columnsInPageWidth = Math.floor(windowWidth / columnWidth);\n    var totalColumnWidth = windowWidth / columnsInPageWidth;\n    document.documentElement.style.setProperty('--totalColumnWidth', totalColumnWidth + \"px\");\n    var totalColumns = Math.round(window.document.body.scrollWidth / totalColumnWidth);\n    var totalChapterWidth = totalColumnWidth * totalColumns;\n    document.documentElement.style.setProperty('--totalChapterWidth', totalChapterWidth + \"px\");\n    for (var column = 1; column <= totalColumns; column++) {\n        var columnDiv = document.createElement('div');\n        columnDiv.className = 'label';\n        var label = document.createElement('p');\n        label.innerText = \"\" + column;\n        columnDiv.appendChild(label);\n        labelsContainer === null || labelsContainer === void 0 ? void 0 : labelsContainer.appendChild(columnDiv);\n    }\n};\nvar onWindowLoad = function () {\n    document.documentElement.style.setProperty('--fontSize', currentFontSize + \"px\");\n    var increaseFontButton = document.body.querySelector('body > .buttons > .increaseFontButton');\n    var decreaseFontButton = document.body.querySelector('body > .buttons > .decreaseFontButton');\n    var updateFontInfo = function () {\n        document.documentElement.style.setProperty('--fontSize', currentFontSize + \"px\");\n        recalculateColumnConfig();\n    };\n    increaseFontButton === null || increaseFontButton === void 0 ? void 0 : increaseFontButton.addEventListener('click', function () {\n        if (currentFontSize < 100) {\n            currentFontSize += 2;\n            updateFontInfo();\n        }\n    });\n    decreaseFontButton === null || decreaseFontButton === void 0 ? void 0 : decreaseFontButton.addEventListener('click', function () {\n        if (currentFontSize > 4) {\n            currentFontSize -= 2;\n            updateFontInfo();\n        }\n    });\n    recalculateColumnConfig();\n    setTimeout(recalculateColumnConfig, 1000);\n};\nwindow.addEventListener('load', onWindowLoad);\nwindow.addEventListener('resize', recalculateColumnConfig);\n\n\n//# sourceURL=webpack:///./dist/index.js?");

/***/ })

/******/ });