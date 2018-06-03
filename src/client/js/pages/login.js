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
		Messages.signUp()
	})
	$('#advanced').on('click', function(){
		new InteractivePopup('#advancedwindow').show()
	})
})
