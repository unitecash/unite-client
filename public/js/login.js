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
var loggedIn = false
$(document).ready(function(){
	$('#user').focus()
	// determine if values were stored in localStorage
	if(localStorage.insightBaseURL === undefined){
		localStorage.insightBaseURL = 'https://bitcoincash.blockexplorer.com/api/'
	}
	if(localStorage.websockURL === undefined){
		localStorage.websockURL = 'wss://bitcoincash.blockexplorer.com'
	}
	$('#insightURL').val(localStorage.insightBaseURL)
	$('#websockURL').val(localStorage.websockURL)
	$('#loginform').on('submit', function(ev){
		ev.preventDefault()
		// verify insight URL and WebSocket URL
		$.ajax({
			type: "GET",
			url: $('#insightURL').val() + 'status?q=getInfo',
			success: function(data){
				var testSock = io($('#websockURL').val())
				testSock.on('connect', function(){
					loggedIn = true
					// store URLs in localStorage for future use
					localStorage.insightBaseURL = $('#insightURL').val()
					localStorage.websockURL = $('#websockURL').val()
					// check if WIF was used for login
					if($('#privatekeyfield').val().length > 1){
						// TODO validate the private key
						sessionStorage.privateKey = $('#privatekeyfield').val()
						sessionStorage.insightBaseURL = $('#insightURL').val()
						sessionStorage.webSocketEndpoint = $('#websockURL').val()
						// TODO remember their last page
						window.location.href = 'profile.html'
					}else{
						if($('#user').val().length < 1){
							new ErrorBanner('Please enter a username').show()
						}else if($('#pass').val().length < 12){ // [TODO]: validate this
							new Popup().setTitle('PASSWORD SECURITY')
							.addText(`<p>
								You MUST choose a complex password for this or your funds could
								be stolen!
							</p>
							<p>
								Please choose a password that, AT MINIMUM, meets the following
								requirements:</p>
							<ul>
								<li>Is at least 12 characters in length</li>
								<li>Does not contain a name or common word</li>
								<li>Contains a number and a symbol</li>
								<li>Contains lowercase and uppercase letters</li>
							</ul>`)
							.show()
						}else if($('#insightURL').val().length < 6){
							new ErrorBanner('Is that Insight URL correct?').show()
						}else if($('#websockURL').val().length < 6){
							new ErrorBanner('That WebSocket URL smells fishy...').show()
						}else{
							$('#loginbutton').val('PLEASE WAIT...')
							var key = sha512('memologin:'+$('#user').val()+$('#pass').val())
							key = key.substr(0, $('#pass').val().length)
							key = sha512(key)
							for(var i = 0;
									i < $('#user').val().length * $('#pass').val().length
									&& i < 500; i++) {
								var n = 'bar'
								var m = 3301
								for(var j = 0; j < i; j++){
									n += 'fooo'
									m += n.length
								}
								key = sha512(n + key + (m-i))
							}
							key = bch.crypto.BN.fromString(key.substr(0, 32))
							sessionStorage.privateKey = new bch.PrivateKey(key).toWIF()
							sessionStorage.insightBaseURL = $('#insightURL').val()
							sessionStorage.webSocketEndpoint = $('#websockURL').val()
							// TODO remember their last page
							window.location.href = 'profile.html'
						}
					}
				})
				testSock.on('error', function() {
					if(!loggedIn){
						testSock.disconnect()
						new Popup()
						.setTitle('CHECK WEBSOCKET URL')
						.addText(`
							It doesn't seem like your WebSocket URL is connecting properly.
							Make sure it begins with "wss://..."`)
						.show()
					}
				})
				testSock.on('connect_failed', function(){
					if(!loggedIn){
						testSock.disconnect()
						new Popup().setTitle('CHECK WEBSOCKET URL')
						.addText(`
							It doesn\'t seem like your WebSocket URL is connecting properly.
							Make sure it begins with "wss://..."`)
						.show()
					}
				});
				testSock.on('connect_error', function(){
					if(!loggedIn){
						testSock.disconnect()
						new Popup().setTitle('CHECK WEBSOCKET URL')
						.addText(`
							It doesn\'t seem like your WebSocket URL is connecting properly.
							Make sure it begins with "wss://..."`)
						.show()
					}
				});
			},
			error: function(data){
				new ErrorBanner('Is that Insight URL correct?').show()
			}
		})
	})
	// when we click sign up
	$('#signupButton').on('click', function(ev){
		ev.preventDefault()
		new Popup()
		.setTitle('NO NEED TO SIGN UP WITH UNITE!')
		.addText(`<p>
			Just enter a unique username and a secure password to create
			your profile!
		</p>
		<p>
			Unite has no central authority. That means nobody can stop
			you from creating an account, and there is nobody to "sign up"
			with.
		</p>`)
		.show()
	})
	$('#advanced').on('click', function(){
		new InteractivePopup('#advancedwindow').show()
	})
})


/***/ })

/******/ });
//# sourceMappingURL=login.js.map