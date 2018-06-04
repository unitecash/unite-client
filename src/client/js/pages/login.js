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

$(document).ready(() => {
	$('#user').focus()
	$('#insightURL').val(config.randomInsightEndpoint())
	$('#websockURL').val(config.randomInsightWebsocket())
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
					// check if WIF was used for login
					if ($('#privatekeyfield').val().length > 5) { // logging in with WIF
						// TODO validate the private key
						sessionStorage.privateKey = $('#privatekeyfield').val()
						Utilities.redirect('profile.html')
					} else { // logging in with username and password
						if($('#user').val().length < 1){
							new ErrorBanner('Please enter a username').show()
						}else if($('#pass').val().length < 12){ // [TODO]: validate this
							Messages.passwordSecurity()
						}else if($('#insightURL').val().length < 6){
							new ErrorBanner('Is that Insight URL correct?').show()
						}else if($('#websockURL').val().length < 6){
							new ErrorBanner('That WebSocket URL smells fishy...').show()
						}else{
							$('#loginbutton').val('PLEASE WAIT...')
							// current implementation of key stretching algorithm
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
							Utilities.redirect('profile.html')
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
	$('#signupButton').on('click', function(ev){
		ev.preventDefault()
		Messages.signUp()
	})
	$('#advanced').on('click', function(){
		new InteractivePopup('#advancedwindow').show()
	})
})
