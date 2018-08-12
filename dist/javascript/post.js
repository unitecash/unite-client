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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/post.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/pages/post.js":
/*!***************************!*\
  !*** ./src/pages/post.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

window.pageInit = function () {

  // define a React component for the page
  var PostPage = function (_React$Component) {
    _inherits(PostPage, _React$Component);

    function PostPage() {
      _classCallCheck(this, PostPage);

      return _possibleConstructorReturn(this, (PostPage.__proto__ || Object.getPrototypeOf(PostPage)).apply(this, arguments));
    }

    _createClass(PostPage, [{
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          { className: "content" },
          React.createElement("div", { id: "posts" })
        );
      }
    }]);

    return PostPage;
  }(React.Component);

  ReactDOM.render(React.createElement(PostPage, null), document.getElementById('app'));

  new NavigationMenu({
    pageTitle: 'Replies',
    pageIcon: './images/newusers_icon.svg',
    rightButton: new ImageButton({
      text: 'New Post',
      image: './images/compose_icon.svg',
      onclick: function onclick() {
        new CompositionWindow(post);
      }
    }).render(),
    showBackButton: true
  });

  window.topPostTXID = Utilities.resolveGETParam('txid');
  new Transaction(window.topPostTXID, {
    loadChildren: true
  });
};
window.onPostLoad = function (post) {
  return new Promise(function (resolve, reject) {
    if (post.txid === window.topPostTXID) {
      post.init().then(function (result) {
        resolve(result);
      });
    } else if (post.parentTXID !== undefined) {
      if ($('#' + post.parentTXID.substr(0, 16)).length === 1) {
        post.init().then(function (result) {
          resolve(result);
        });
      }
    } else {
      resolve(false);
    }
  });
};

/***/ })

/******/ });
//# sourceMappingURL=post.js.map