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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client/js/pages/profile.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/js/pages/profile.js":
/*!****************************************!*\
  !*** ./src/client/js/pages/profile.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.pageInit = () => {
  window.currentUserAddress = Utilities.resolveGETParam('addr')
  if (window.currentUserAddress === false) {
    window.currentUserAddress = config.userAddress
  }
  var leftButton = ''
  if (window.currentUserAddress === config.userAddress) {
    leftButton = new ImageButton({
      text: 'Settings',
      image: './images/settings_icon.svg',
      onclick: () => {
        new SettingsWindow()
      }
    }).render()
  }
  window.currentUser = new User(window.currentUserAddress).then((user) => {
    user.loadPosts()

    var inlineName = user.name.getInlineName()
    $('#myName').text('')
    $('#myName').append('Hi, ')
    $('#myName').append(inlineName)
    $('#myName').append('!')

    new NavigationMenu({
      pageTitle: 'Profile',
      pageIcon: './images/profile_icon.svg',
      leftButton: leftButton,
      rightButton: new ImageButton({
        text: 'New Post',
        image: './images/compose_icon.svg',
        onclick: () => {
          new CompositionWindow()
        }
      }).render(),
      showBackButton: (window.currentUserAddress !== config.userAddress)
    })
  })
}

window.onPostLoad = function (post) {
  // Only display posts sent by this user
  if (post.sender === window.currentUserAddress) {
    post.render()
  }
}


/***/ })

/******/ });
//# sourceMappingURL=profile.js.map