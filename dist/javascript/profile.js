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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/profile.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/pages/profile.js":
/*!******************************!*\
  !*** ./src/pages/profile.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

window.pageInit = function () {

  // extract the target user's address from the URL string or use current user
  window.currentUserAddress = Utilities.resolveGETParam('addr');
  if (window.currentUserAddress === false) {
    window.currentUserAddress = config.userAddress;
  }

  // show the settings button if the profile is the logged-in user
  var leftButton = '';
  if (window.currentUserAddress === config.userAddress) {
    leftButton = new ImageButton({
      text: 'Settings',
      image: './images/settings_icon.svg',
      onclick: function onclick() {
        new SettingsWindow();
      }
    }).render();
  }

  // create the navigation menu
  new NavigationMenu({
    pageTitle: 'Profile',
    pageIcon: './images/profile_icon.svg',
    leftButton: leftButton,
    rightButton: new ImageButton({
      text: 'New Post',
      image: './images/compose_icon.svg',
      onclick: function onclick() {
        new CompositionWindow();
      }
    }).render(),
    showBackButton: window.currentUserAddress !== config.userAddress
  });

  // define a React component for the page

  var ProfilePage = function (_React$Component) {
    _inherits(ProfilePage, _React$Component);

    function ProfilePage() {
      _classCallCheck(this, ProfilePage);

      return _possibleConstructorReturn(this, (ProfilePage.__proto__ || Object.getPrototypeOf(ProfilePage)).apply(this, arguments));
    }

    _createClass(ProfilePage, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          { className: 'content' },
          React.createElement(
            'div',
            { className: 'UIPanel center center-text' },
            React.createElement('img', { id: 'profileImage', src: './images/unite_icon.svg', className: 'ProfileImage center' }),
            React.createElement(
              'p',
              { id: 'myName' },
              'loading...'
            ),
            React.createElement(
              'p',
              { id: 'profileText' },
              'No tagline set'
            ),
            React.createElement(
              'p',
              { id: 'editButton', className: 'center' },
              'Edit...'
            )
          ),
          React.createElement('div', { id: 'posts' })
        );
      }
    }]);

    return ProfilePage;
  }(React.Component);

  ReactDOM.render(React.createElement(ProfilePage, null), document.getElementById('app'));

  // create a user and load their properties into the page
  window.currentUser = new User(window.currentUserAddress).then(function (user) {
    user.loadPosts();

    var inlineName = user.name.getInlineName();
    $('#myName').text('');
    $('#myName').append('Hi, ');
    $('#myName').append(inlineName);
    $('#myName').append('!');
  });
};

window.onPostLoad = function (post) {
  return new Promise(function (resolve, reject) {
    // Only display posts sent by this user
    if (post.sender === window.currentUserAddress) {
      post.init().then(function (result) {
        resolve(result);
      });
    } else {
      resolve(false);
    }
  });
};

/***/ })

/******/ });
//# sourceMappingURL=profile.js.map