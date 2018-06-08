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

window.pageInit = function () {
  $('#mybalance').on('click', () => {
    new InteractivePopup('#moreProfileInfo').show()
  })

  $('#changename').on('click', () => {
    new InteractivePopup('#changeNameDiv').show()
  })

  $('#settingsbutton').on('click', () => {
    new InteractivePopup('#settings').show()
  })

  $('#privKeyDisplayButton').on('click', () => {
    new InteractivePopup('#showKey').show()
  })

  $('#keyDisplay').on('click', () => {
    new InteractivePopup('#showPrivateKey').show()
  })

  // set address text
  $('#myaddress').text(config.userAddress)

  networkManager.getBalance(config.userAddress).then((balance) => {
    $('#mybalance').text('BALANCE: ' + balance + ' BCH')
  })

  // get posts this user has written in the past
  //TransactionManager.loadTransactionsByAddress(config.userAddress)

  // get the user's name and display italic
  NameManager.resolveFromAddress(config.userAddress).then((name) => {
    var nameHash = $('<img></img>')
    nameHash.attr('src', name.hashData)
    nameHash.attr('alt', 'True Address: ' + name.address)
    nameHash.attr('title', 'True Address: ' + name.address)
    nameHash.attr('class', 'UIInlineNameHash')
    $('#myName').text('')
    $('#myName').append('Hi, ')
    $('#myName').append(nameHash)
    $('#myName').append(name.displayName)
    $('#myName').append('!')
  })

  // display a QR code for deposit
  $('#myqrcode').attr(
    'src',
    'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' +
    config.userAddress
  )

  // set the private key text
  $('#privateKeyText').text(config.userPrivateKey.toWIF())
}

window.onPostLoad = function (post) {
  // Only display posts sent by this user
  if (post.sender == config.userAddress.toString()) {
    post.render()
  }
}


/***/ })

/******/ });
//# sourceMappingURL=profile.js.map