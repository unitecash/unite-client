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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client/js/pages/login.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/js/pages/login.js":
/*!**************************************!*\
  !*** ./src/client/js/pages/login.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Login Entry Point Script
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * This file provides the code to be executed on the login page.
 *
 * @file Provides an entry point for the login page.
 */

var fade = $('*:visible')
fade.hide()
fade.fadeIn('slow')

$(document).ready(() => {
  $('#user').focus()
  $('#insightURL').val(config.randomInsightEndpoint())
  $('#websockURL').val(config.randomInsightWebsocket())
  $('#loginform').on('submit', function (ev) {
    ev.preventDefault()
    // check if WIF was used for login
    if ($('#privatekeyfield').val().length > 5) { // logging in with WIF
      // TODO validate the provided private key
      sessionStorage.privateKey = $('#privatekeyfield').val()
      Utilities.redirect('profile.html')
    } else { // logging in with username and password
      if ($('#user').val().length < 1) {
        new ErrorBanner('Please enter a username').show()
      } else if ($('#pass').val().length < 12) { // [TODO]: validate this
        Messages.passwordSecurity()
      } else if ($('#insightURL').val().length < 6) {
        new ErrorBanner('Is that Insight URL correct?').show()
      } else if ($('#websockURL').val().length < 6) {
        new ErrorBanner('That WebSocket URL smells fishy...').show()
      } else {
        $('#loginbutton').val('PLEASE WAIT...')
        sessionStorage.privateKey = Utilities.privateKeyFromLoginCredentials (
          $('#user').val(),
          $('#pass').val()
        )
        Utilities.redirect('profile.html')
      }
    }
  })
  $('#signupButton').on('click', (ev) => {
    ev.preventDefault()
    Messages.signUp()
  })
  $('#advanced').on('click', function () {
    new InteractivePopup('#advancedwindow').show()
  })
})


/***/ })

/******/ });
//# sourceMappingURL=login.js.map