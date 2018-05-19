
import $ from './lib/jquery.js'
window.jQuery = $
window.$ = $
import bchaddr from './lib/bchaddr.js'
import bitcoincash from './lib/bitcoincash.js'
window.bch = bitcoincash
import './lib/pnglib.js'
import './lib/identicon.js'
import io from './lib/socket.io.js'
window.io = io
import './lib/sha512.js'
import './lib/webtorrent.js'

import App from './App'

app = new App()

var fade = $('*:visible')
fade.hide()
fade.fadeIn('slow')
var loggedIn = false
$(document).ready(function(){
	$('#advancedwindow').hide()
	$('#user').focus()
	// determine if values were stored in localStorage
	if(localStorage.insightBaseURL == undefined){
		localStorage.insightBaseURL = 'https://bitcoincash.blockexplorer.com/api/'
	}
	if(localStorage.websockURL == undefined){
		localStorage.websockURL = 'wss://bitcoincash.blockexplorer.com';
	}
	$('#insightURL').val(localStorage.insightBaseURL);
	$('#websockURL').val(localStorage.websockURL);
	$('#loginform').on('submit', function(ev){
		ev.preventDefault();
		// verify insight URL and WebSocket URL
		$.ajax({
			type: "GET",
			url: $('#insightURL').val() + 'status?q=getInfo',
			success: function(data){
				var testSock = io($('#websockURL').val());
				testSock.on('connect', function(){
					loggedIn = true;
					// store URLs in localStorage for future use
					localStorage.insightBaseURL = $('#insightURL').val();
					localStorage.websockURL = $('#websockURL').val();
					// check if WIF was used for login
					if($('#privatekeyfield').val().length > 1){
						// TODO validate the private key
						sessionStorage.privateKey = $('#privatekeyfield').val();
						sessionStorage.insightBaseURL = $('#insightURL').val();
						sessionStorage.webSocketEndpoint = $('#websockURL').val();
						// TODO remember their last page
						// TODO validate the websock and insight URLs work
						window.location.href = 'profile.html';
					}else{
						if($('#user').val().length < 1){
							display_error('Please enter a username');
						}else if($('#pass').val().length < 12){
							var newString = '<h1>PASSWORD SECURITY</h1><p>You MUST choose a complex password ';
							newString += 'or your funds could be stolen!</p><p>Please choose a password that ';
							newString += '(at MINIMUM)...</p<ul style="align:left;text-align:left"><li>Is 12 characters in length</li>';
							newString += '<li>Does not contain a name or common word</li><li>Contains a number</li>';
							newString += '<li>Contains lowercase and uppercase letters</li></ul>';
							display_alert(newString);
						}else if($('#insightURL').val().length < 6){
							display_error('verify the insight URL is valid');
						}else if($('#websockURL').val().length < 6){
							display_error('verify the WebSocket URL is valid');
						}else{
							// TODO add key stretching to make this more secure
							var key = sha512(sha512('memologin:'+$('#user').val()+$('#pass').val()));
							key = new Buffer(key);
							key = bch.crypto.Hash.sha256(key);
							key = bch.crypto.BN.fromBuffer(key);
							$('#loginbutton').val('PLEASE WAIT...');
							var key = sha512(sha512('memologin:'+$('#user').val()+$('#pass').val()).substr(0, $('#pass').val().length));
							for(var i = 0; i < $('#user').val().length * $('#pass').val().length && i < 500; i++){
								var n = 'bar';
								var m = 3301;
								for(var j = 0; j < i; j++){
									n += 'fooo';
									m += n.length;
								}
								key = sha512(n + key + (m-i));
							}
							sessionStorage.privateKey = new bch.PrivateKey(bch.crypto.BN.fromString(key.substr(0, 32))).toWIF();
							sessionStorage.insightBaseURL = $('#insightURL').val();
							sessionStorage.webSocketEndpoint = $('#websockURL').val();
							// TODO remember their last page
							// TODO validate the websock and insight URLs work
							window.location.href = 'profile.html';
						}
					}
				});
				testSock.on('error', function(){
					if(!loggedIn){
						testSock.disconnect();
						display_alert('<h1>CHECK WEBSOCKET URL</h1><p>It doesn\'t seem like your WebSocket URL is connecting properly. Make sure it begins with "wss://..."</p>');
					}
				});
				testSock.on('connect_failed', function(){
					if(!loggedIn){
						testSock.disconnect();
						display_alert('<h1>CHECK WEBSOCKET URL</h1><p>It doesn\'t seem like your WebSocket URL is connecting properly. Make sure it begins with "wss://..."</p>');
					}
				});
				testSock.on('connect_error', function(){
					if(!loggedIn){
						testSock.disconnect();
						display_alert('<h1>CHECK WEBSOCKET URL</h1><p>It doesn\'t seem like your WebSocket URL is connecting properly. Make sure it begins with "wss://..."</p>');
					}
				});
			},
			error: function(data){
				display_alert('<h1>CHECK INSIGHT URL</h1><p>It doesn\'t seem like your Insight URL is working. Make sure it includes the ".../insight-api/" or ".../api" part.</p>');
			}
		});
	});
	// when we click sign up
	$('#signupButton').on('click', function(ev){
		ev.preventDefault()
		var newString = '<h1>NO NEED TO SIGN UP WITH Unite!</h1><p>Just enter a unique username and a secure password '
		newString += 'to create your profile!</p><p>Unite has no central authority. That means nobody can stop you from '
		newString += 'creating an account, and there is nobody to "sign up" with.</p>'
		display_alert(newString)
	})
	$('#advanced').on('click', function(){
		display_html_alert('#advancedwindow')
	})
})
