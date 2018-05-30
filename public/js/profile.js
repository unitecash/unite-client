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

var load_data = function(){
	$('#mybalance').on('click', function(){
		display_html_alert('#moreProfileInfo');
	});
	$('#changename').on('click', function(){
		display_html_alert('#changeNameDiv');
	});
	$('#settingsbutton').on('click', function(){
		display_html_alert('#settings');
	});

	// set address text
	$('#myaddress').text(bchaddr.toCashAddress(address.toString()));

	// get address balance
	// TODO get_balance(addr)
	$.ajax({
		type: "GET",
		url: insightBaseURL + 'addr/' + address.toString(),
		success: function(data){
			$('#mybalance').text('BALANCE: ' + data.balance + " BCH");
		}
	});

	// get posts this user has written in the past
	get_posts(address.toString());

	// get the user's name and display italic
	get_name(address.toString()).then(function(name){
		myName = name;
		$('#myName').html('Hi, ' + myName.hash + myName.name + '!');
	});

	// display a QR code for deposit
	$('#myqrcode').attr('src', 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' + bchaddr.toCashAddress(address.toString()));

	// set the private key text
	$('#privateKeyText').text(privateKey.toWIF());
}
var handle_new_post = function(post){
	// Only display posts sent by this user
	if(post.sender == address.toString()){
		render_post(post, post.isLive, '#posts');
	}
}


/***/ })

/******/ });
//# sourceMappingURL=profile.js.map