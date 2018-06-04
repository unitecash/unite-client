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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client/js/pages/user.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/js/pages/user.js":
/*!*************************************!*\
  !*** ./src/client/js/pages/user.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * User page logic
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * Defines the logic used by the page which displays user profiles.
 *
 * @file User page logic
 */

window.pageInit = function () {
  window.userAddress = Utilities.resolveGETParam('address')
  // should create window.user = new User(userAddress).then(() => { ... })
  get_posts(userAddress) // should be user.getPosts()

  // get the user's name and display italic
  /* get_name (userAddress).then(function(name) {
		// should be NamManager.resolveFromAddress(addr)
		userName = name
		$('#myName').html(name.hash + name.name)
		$('#headertitle').text(name.name)
	}) */
  // ^ should just be $('#myName').html(name.hash + user.displayName
}
window.onPostLoad = function (post) {
  // Only display posts sent by this user
  if (post.sender === user.address) {
    post.render('#posts')
  }
}


/***/ })

/******/ });
//# sourceMappingURL=user.js.map