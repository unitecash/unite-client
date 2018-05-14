/*
Unite - Initialization Script
Author: The Unite.cash Developer
License: MIT

This script provides the framework for the implementation
of the Unite protocol (outlined in the protocol documentation).
It consists of helper functions, protocol constants, and
should be included by all HTML files, in addition to:
- transaction.js for "data-transport" / blockchain interfacing
- post.js for post-layer processing
- name.js for address-name resolution

*/

//////////   GLOBAL VARIABLES

var central_posts_address = '1HBqvcE3jArLxTe4p2KRaDsRHHtEaqG66z';     // see docs
var central_profiles_address = '1B4wyiAP3xYx2H8AqMqrwdMfbw7YwFd4C3';  // see docs
var central_groups_address = '14F1NbudfgRyEzau29HpexQPzHkghbWUKR';    // see docs
var central_reporting_address = '12xemQTP98jgkAUGuGqHghdVSufqR7htjY'; // see docs

var privateKey;
var address;
var myName;
var insightBaseURL; // TODO a function for returning this, so random URLs can be implemented
var websock;        // same??? maybe??? we crazy folk like that?
var highestZIndexUsed = 2; // tracks the highest Z index used by dialog boxes
var renderedPosts = []; // array of TXIDs for posts which have been handled, to avoid duplications
var dustLimitSize = 547; // the communist central-planning bullshit dust limit (see below for <rant>)
var feeThreshold = 1.95; // fee threshold: 4 = 0.5sat/b 2 = 1sat/b, 1 = 2 sat/b, 0.5 = 4 sat/b
var debug = false; // toggle debug messages

//////////   MAIN INITIALIZATION CODE

$(document).ready(function(){
	
	// check to see if the user has logged in yet
	if(sessionStorage.privateKey !== undefined &&
			sessionStorage.insightBaseURL !== undefined){
		
		// user was logged in, reconstruct environment from sessionStorage
		insightBaseURL = sessionStorage.insightBaseURL;
		privateKey = bch.PrivateKey.fromWIF(sessionStorage.privateKey);
		address = privateKey.toAddress();
		
		// check that the localStorage data structures were defined
		if(localStorage.names == undefined){
			var names = [];
			localStorage.names = JSON.stringify(names);
		}
		
		if(localStorage.posts == undefined){
			var posts = [];
			localStorage.posts = JSON.stringify(posts);
		}
		
		if(localStorage.transactions == undefined){
			var transactions = [];
			localStorage.transactions = JSON.stringify(transactions);
		}
		
		// acquire notification permissions
		if(Notification.permission == 'default' && localStorage.notification == undefined){
			localStorage.notification = 1;
			display_alert('<h1>Allow Notifications</h1><p>Notifications let you know when your friends send you tips or replies.</p>');
			Notification.requestPermission(function(permission){
				if(permission != 'granted'){
					var newString = '<h1>NOTIFICATIONS</h1><p>Unite will work without ';
					newString += 'notifications, but you won\'t be notified when you ';
					newString += 'get messages or tips from your friends.</p>';
					display_alert(newString);
				}else{
					display_success('<p>We\'ll let you know when new things happen!</p>', 2000);
				}
			});
		}
		
		// connect to the WebSocket
		websock = io(sessionStorage.webSocketEndpoint);
		websock.on('connect', function(){
			
			// subscribe to the relevant channels
			// TODO only subscribe to channels for addresses/events the user indicates
			websock.emit('subscribe', 'inv');
			
			// begin listening on the WebSocket
			socket_listen(websock);
			
			// if it exists, call the function on the host page for the connect event
			if(typeof ws_connect != 'undefined'){
				ws_connect();
			}
		});
		
		// go back or close dialog when user presses escape/back
		$(document).on('keydown', function(e) {
			if (e.keyCode == 27){
				document.elementFromPoint(10, 10).click();
			}
		});
		
		// listen for submit events from forms which may be present on the host page
		listen_forms();
		
		// call the data loading function present on host pages responsible for
		// displaying dynamic content
		if(typeof load_data != 'undefined'){
			load_data();
		}
	}else{ // in case the user was not logged in
		if(window.location.pathname.split('/').pop() != 'login.html'){
			// redirect the user to login.html unless they were already there
			window.location.href = 'login.html';
		}
	}
});

//////////  USEFUL DATA PARSING FUNCTIONS

// for converting hex into ascii
var hex2a = function(hexx) {
    var hex = hexx.toString();
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

// for inserting chars into a string at a given position
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

////////// SOUNDS, GRAPHICS AND NOTIFICATIONS

var pop = function(){
	new Audio('./res/pop.wav').play();
}

var boink = function(){
	new Audio('./res/boink.wav').play();
}

var beep = function(){
	new Audio('./res/beep.wav').play();
}

var woosh = function(){
	new Audio('./res/woosh.wav').play();
}

var swooosh = function(){
	new Audio('./res/swooosh.wav').play();
}

// Provides a standard way of displaying error banners.
var display_error = function(error, time=5000){
	boink();
	// get a random ID
	var randID = sha512('potato'+new Date().toTimeString()+error).substr(0, 16);
	var newString = '<div class="banner error" id="'+randID+'">'+error;
	newString += '<button onclick="$(\'#'+randID+'\').slideUp(\'fast\');" ';
	newString += 'class="UICloseBannerButton">×</button></div>';
	$('body').append(newString);
	$('#'+randID).hide();
	$('#'+randID).slideToggle('fast');
	setTimeout(function(){
		$('#'+randID).slideUp('fast');
	}, time);
}

// Provides a way of displaying success and notification banners.
/* TODO:
- Add a customizable click event so the user can be directed to the source
  of the notification or alert.
*/
var display_success = function(error, time=5000){
	// get a random ID
	var randID = sha512('tomato'+new Date().toTimeString()+error).substr(0, 16);
	var newString = '<div class="banner success" id="'+randID+'">'+error;
	newString += '<button onclick="$(\'#'+randID+'\').slideUp(\'fast\');" ';
	newString += 'class="UICloseBannerButton">×</button></div>';
	$('body').append(newString);
	$('#'+randID).hide();
	$('#'+randID).slideToggle('fast');
	setTimeout(function(){
		$('#'+randID).slideUp('fast');
	}, time);
}

// Provides a standard way of displaying alert dialog boxes.
/* TODO:
- Add the ability to use multiple buttons with custom callback functions
- Add a callback for when the dialog is closed
*/
var display_alert = function(error){
	pop();
	// get a random ID
	var randID = sha512('tomato'+new Date().toTimeString()+error).substr(0, 16);
	var newString = '<div style="z-index:'+highestZIndexUsed+';" class="UIDimmedBackground" id="';
	newString += randID+'a" onclick="$(\'#'+randID+'\').fadeOut(100);';
	newString += '$(\'#'+randID+'a\').fadeOut(100);woosh();setTimeout(function(){';
	newString += '$(\'#'+randID+'a\').remove();}, 150);"></div>';
	newString += '<div style="z-index:'+(highestZIndexUsed+1)+';" class="UIAlertWindow" id="';
	newString += randID+'">'+error+'</div>';
	$('body').append(newString);
	$('#'+randID).hide();
	$('#'+randID+'a').hide();
	$('#'+randID+'a').fadeIn(100);
	$('#'+randID).slideDown(100);
	document.activeElement.blur();
	highestZIndexUsed += 2;
}

// Displays an alert from an HTML template present on the host page
var display_html_alert = function(tag){
	pop();
	var randID = sha512('tomato'+new Date().toTimeString()+tag).substr(0, 16);
	var newString = '<div style="z-index:'+highestZIndexUsed+';" class="UIDimmedBackground" id="';
	newString += randID+'a" onclick="$(\''+tag+'\').fadeOut(100);';
	newString += '$(\'#'+randID+'a\').fadeOut(100);woosh();setTimeout(function(){';
	newString += '$(\'#'+randID+'a\').remove();}, 150);"></div>';
	$('body').append(newString);
	$('#'+randID+'a').hide();
	$('#'+randID+'a').fadeIn(100);
	$(tag).slideDown(100);
	$(tag).attr('style', 'z-index:'+(highestZIndexUsed+1)+';');
	$(tag).css('display', 'inline');
	document.activeElement.blur();
	highestZIndexUsed += 2;
}

// Parses a notification out of a post, then displays the notification.
/* TODO:
- Add an optional "on click" callback on the banner and/or notification to allow
  the user to get to the source of the message if desired.
*/
var parse_notification = function(post){
	if(post.type == '5501'){
		display_notification(post.name.name, post.data);
	}
	if(post.type == '5504'){
		display_notification(post.sender.substr(0, 6), 'Changed name to ' + post.name.name);
	}
}

// displays a notification if the document is not in focus, or a banner if it is.
/* TODO:
- Add an optional "on click" callback on the notification to allow
  the user to get to the source of the message/action if desired.
*/
var display_notification = function(title, text){
	if(!document.hasFocus()){ // the user is not using the application
		var n = new Notification(title, {icon: './res/icon.png', body: text});
		n.onclick = function(ev){
			parent.focus();
			if(typeof require != undefined){
				var win = require("electron").remote.getCurrentWindow();
				win.show();
				win.setAlwaysOnTop(true);
				win.focus();
				win.setAlwaysOnTop(false);
			}
		};
	}else{ // the user is using the application
		display_success(title + '   ' + text);
	}
	pop();
}

//////////   WEBSOCKET FUNCTIONS

// listens to the WebSocket for incoming transactions.
/* TODO:
- only subscribe to the rooms for addresses this user follows or shows interest in
*/
var socket_listen = function(socket){
	socket.on('tx', function(data){
		get_tx(data.txid).then(function(tx){
			if(tx != -1){
				parse_tx(tx, 1);
			}
		});
	});
}

// returns GET parameters from the URL
var find_get_parameter = function(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

//////////   FORMS AND EVENTS RELATED TO HOST PAGE

// listen for form submission and related events
var listen_forms = function(){
	// log out when a log out button ls clicked
	$('#logout').on('click', function(ev){
		ev.preventDefault();
		$('*').fadeOut(1000);
		delete sessionStorage.privateKey;
		delete sessionStorage.insightBaseURL;
		setTimeout(function(){
			window.location.href = 'login.html';
		}, 1100);
	});
	
	$('#backbutton').on('click', function(){
		history.back();
	});
	
	// send post when a send post button is clicked
	$('#sendpost').on('submit', function(ev){
		ev.preventDefault();
		var post_text = $('#newpost').val();
		if(post_text.length < 1 || post_text.length > 77){
			display_alert('[TEMPORARY] There is a temporary character limit of 77 characters for all posts. This will be removed soon!');
		}else{
			find_utxo(address.toString()).then(function(utxo){
				if(utxo == -1){
					var newString = '<h1>ACCOUNT BALANCE</h1>';
					newString += '<p>Check that you\'ve funded your account before posting!</p>';
					newString += '<p>We\'re working on a way to fund new users\' posts, it\'ll be ';
					newString += 'out soon!</p><p>In the meantime, here are some ways to fund your account: </p>';
					newString += '<ul><li>Ask a friend to send you some Bitcoin Cash to your Unite address</li>';
					newString += '<li>You can get some from the free.bitcoin.com faucet</li>';
					newString += '<li>You can trade any cryptocurrency for Bitcoin Cash on ShapeShift</li>';
					newString += '<li>You can be tipped on sites like yours.org or Reddit (r/btc)</li>';
					newString += '<li>You can buy some on sites like coinbase.com or kraken.com</li></ul>';
					display_alert(newString);
				}else{
					// create dummy tx to find approximate actual TX size with fee
					transaction = new bch.Transaction();
					transaction.from(utxo);
					transaction.to(address.toString(), utxo.satoshis - 768); // approximate
					transaction.to(central_posts_address, dustLimitSize)
					transaction.addData(hex2a('5501')+post_text)
					transaction.sign(privateKey);
					var tx_size = parseInt(transaction.toString().length/feeThreshold); // fee threshold
					// recreate transaction with correct fee
					transaction = new bch.Transaction();
					transaction.from(utxo)
					transaction.to(address.toString(), utxo.satoshis - dustLimitSize - tx_size)
					transaction.to(central_posts_address, dustLimitSize)
					transaction.addData(hex2a('5501')+post_text)
					transaction.sign(privateKey);
					broadcast_tx(transaction.toString());
					display_success('Your post has been sent!');
					swooosh();
					$('#newpost').val('');
				}
			});
		}
	});
	
	// name change form submit listener
	$('#namechangesubmit').on('click', function(){
		var name = $('#newName').val();
		if(name.length < 5 || name.length > 24){
			display_alert("Your name shouldn't be less than 5 or more than 24 characters!");
		}else{
			find_utxo(address.toString()).then(function(utxo){
				// create dummy tx to find approx size with fee
				transaction = new bch.Transaction();
				transaction.from(utxo);
				transaction.to(address.toString(), utxo.satoshis - dustLimitSize - 280); // approximate
				transaction.to(central_profiles_address, dustLimitSize);
				transaction.addData(hex2a('5504')+name);
				transaction.sign(privateKey);
				var tx_size = parseInt(transaction.toString().length/feeThreshold);
				// recreate transaction with correct fee
				transaction = new bch.Transaction();
				transaction.from(utxo);
				transaction.to(address.toString(), utxo.satoshis - dustLimitSize - tx_size);
				transaction.to(central_profiles_address, dustLimitSize);
				transaction.addData(hex2a('5504')+name);
				transaction.sign(privateKey);
				broadcast_tx(transaction.toString());
				display_success('Name updated!');
				$('#newName').val('');
			});
		}
	});
	
	// send reply when a send reply button is clicked
	$('#sendreply').on('submit', function(ev){
		ev.preventDefault();
		var post_text = $('#newpost').val();
		if(post_text.length < 1 || post_text.length > 45){
			display_alert('[TEMPORARY] There is a temporary character limit of 45 characters for all posts. This will be removed soon!');
		}else{
			find_utxo(address.toString()).then(function(utxo){
				if(utxo == -1){
					var newString = '<h1>ACCOUNT BALANCE</h1>';
					newString += '<p>Check that you\'ve funded your account before posting!</p>';
					newString += '<p>We\'re working on a way to fund new users\' posts, it\'ll be ';
					newString += 'out soon!</p><p>In the meantime, here are some ways to fund your account: </p>';
					newString += '<ul><li>Ask a friend to send you some Bitcoin Cash to your Unite address</li>';
					newString += '<li>You can get some from the free.bitcoin.com faucet</li>';
					newString += '<li>You can trade any cryptocurrency for Bitcoin Cash on ShapeShift</li>';
					newString += '<li>You can be tipped on sites like yours.org or Reddit (r/btc)</li>';
					newString += '<li>You can buy some on sites like coinbase.com or kraken.com</li></ul>';
					display_alert(newString);
				}else{
					// TODO [IMPORTANT!] verify this is set in the URL
					// create dummy tx to find approximate actual TX size with fee
					transaction = new bch.Transaction();
					transaction.from(utxo);
					transaction.to(address.toString(), utxo.satoshis - dustLimitSize - 300); // approximate
					transaction.to(topPost.sender, dustLimitSize)
					transaction.addData(hex2a('5503')+hex2a(topPost.txid)+post_text)
					transaction.sign(privateKey);
					var tx_size = parseInt(transaction.toString().length/feeThreshold); // fee threshold
					// recreate transaction with correct fee
					transaction = new bch.Transaction();
					transaction.from(utxo);
					transaction.to(address.toString(), utxo.satoshis - dustLimitSize - tx_size); // approximate
					transaction.to(topPost.sender, dustLimitSize)
					transaction.addData(hex2a('5503')+hex2a(topPost.txid)+post_text)
					transaction.sign(privateKey);
					broadcast_tx(transaction.toString());
					console.log(transaction.toString());
					display_success('Your reply has been sent!');
					swooosh();
					$('#newpost').val('');
				}
			});
		}
	});
	
}


/*

Why are we sending 547 satoshis to a central address?

So we can easily get all Unite transactions with insight.

Why not 1 satoshi, you ask?

THE FUCKING CODE DEVELOPERS HAVE IMPLEMENTED A SO-CALLED 'DUST-LIMIT'.
THIS LIMIT IS COMMUNIST-STYLE CENTRAL-PLANNING BULLSHIT.
If I want to send 1 satoshi to someone and pay 200 satoshis to do it,
I should be able to do so. its A FREE FUCKING MARKET ECONOMY!

Whether or not it "makes sense" should be up to NOBODY but me in a
permissionless system. Unite is a PERFECTLY VALID reason for doing this,
and yet it was removed because it "doesn't make any sense". BULLSHIT.

(yet another example of core disingenuously fucking shit up for no
good reason).</rant>

If the use of this address becomes contentious then the network will
move to the Bitcoin genesis address. In that event this address will
be used to query new transactions from there and old ones from this address.

Meanwhile as long as its cool with people I'll set up a faucet so
that new users can use the [nominal] funds from this address to
participate in the network for free at first, until they get some
tips. So SHOW THEM SOME BCH LOVE!!!

Trolls won't get tips, but if new users are good they may be
able to keep using it for absolutely free from their tips.

*/