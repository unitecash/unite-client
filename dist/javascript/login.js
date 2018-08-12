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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/login.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/pages/login.js":
/*!****************************!*\
  !*** ./src/pages/login.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Login Entry Point Script
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * This file provides the code to be executed on the login page.
 *
 * @file Provides an entry point for the login page.
 */

var LoginWindow = function (_React$Component) {
  _inherits(LoginWindow, _React$Component);

  function LoginWindow() {
    _classCallCheck(this, LoginWindow);

    return _possibleConstructorReturn(this, (LoginWindow.__proto__ || Object.getPrototypeOf(LoginWindow)).apply(this, arguments));
  }

  _createClass(LoginWindow, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "form",
          { id: "loginform" },
          React.createElement("img", { src: "./images/banner.png" }),
          React.createElement(
            "h2",
            null,
            "We Stand Against Censorship"
          ),
          React.createElement(
            "h5",
            { className: "text-center" },
            "Please Log In"
          ),
          React.createElement("input", { className: "UITextField center w90", id: "user", placeholder: "Username..." }),
          React.createElement("input", { className: "UITextField center w90", id: "pass", placeholder: "Password...", type: "password" }),
          React.createElement("input", { className: "UIButton center w90", type: "submit", id: "loginbutton", value: "LOG IN" }),
          React.createElement(
            "button",
            { type: "button", className: "UIButton center w90", id: "signupButton" },
            "SIGN UP"
          ),
          React.createElement(
            "p",
            { className: "text-center", id: "advanced" },
            "Advanced..."
          ),
          React.createElement(
            "div",
            { className: "UIAlertWindow hidden", id: "advancedwindow" },
            React.createElement(
              "p",
              null,
              "Insight API Base URL"
            ),
            React.createElement("input", { className: "UITextField center w90", id: "insightURL", placeholder: "URL..." }),
            React.createElement("br", null),
            React.createElement(
              "p",
              null,
              "WebSocket API Endpoint"
            ),
            React.createElement("input", { className: "UITextField center w90", id: "websockURL", placeholder: "wss://..." }),
            React.createElement("br", null),
            React.createElement(
              "p",
              null,
              "Log In with Private Key (WIF)"
            ),
            React.createElement("input", { className: "UITextField center w90", id: "privatekeyfield", placeholder: "WIF Key..." }),
            React.createElement("br", null),
            React.createElement("input", { className: "UIButton center w90", type: "submit", id: "loginbutton", value: "LOG IN" })
          )
        )
      );
    }
  }]);

  return LoginWindow;
}(React.Component);

$(document).ready(function () {

  ReactDOM.render(React.createElement(LoginWindow, null), document.getElementById('app'));

  $('#user').focus();
  //$('#insightURL').val(config.randomInsightEndpoint())
  //$('#websockURL').val(config.randomInsightWebsocket())
  $('#loginform').on('submit', function (ev) {
    ev.preventDefault();
    // check if WIF was used for login
    if ($('#privatekeyfield').val().length > 5) {
      // logging in with WIF
      // TODO validate the provided private key
      sessionStorage.privateKey = $('#privatekeyfield').val();
      Utilities.redirect('profile.html');
    } else {
      // logging in with username and password
      if ($('#user').val().length < 1) {
        new ErrorBanner('Please enter a username').show();
      } else if ($('#pass').val().length < 12) {
        // [TODO]: validate this
        Messages.passwordSecurity();
        //} else if ($('#insightURL').val().length < 6) {
        //  new ErrorBanner('Is that Insight URL correct?').show()
        //} else if ($('#websockURL').val().length < 6) {
        //  new ErrorBanner('That WebSocket URL smells fishy...').show()
      } else {
        $('#loginbutton').val('PLEASE WAIT...');
        sessionStorage.privateKey = Utilities.privateKeyFromLoginCredentials($('#user').val(), $('#pass').val());
        Utilities.redirect('profile.html');
      }
    }
  });
  $('#signupButton').on('click', function (ev) {
    ev.preventDefault();
    Messages.signUp();
  });
  $('#advanced').on('click', function () {
    new InteractivePopup('#advancedwindow').show();
  });
});

/***/ })

/******/ });
//# sourceMappingURL=login.js.map