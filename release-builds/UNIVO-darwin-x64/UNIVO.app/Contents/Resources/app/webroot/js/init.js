/*
UNIVO - Initialization Script
Author: UNIVO_dev
License: MIT

This script provides the framework for the implementation
of the UNIVO protocol (outlined in the protocol documentation).
It consists of helper functions, protocol constants, and
should be included by all HTML files.

*/

//////////   GLOBAL VARIABLES

var central_posts_address = '1HBqvcE3jArLxTe4p2KRaDsRHHtEaqG66z';
var central_profiles_address = '1B4wyiAP3xYx2H8AqMqrwdMfbw7YwFd4C3';
var central_groups_address = '14F1NbudfgRyEzau29HpexQPzHkghbWUKR';
var central_reporting_address = '';

var privateKey;
var address;
var insightBaseURL;
var websock;
var dustLimitSize = 547;
var debug = false;

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
		if(Notification.permission == 'default'){
			Notification.requestPermission(function(permission){
				if(permission != 'granted'){
					var newString = '<h1>NOTIFICATIONS</h1><p>UNIVO will work without ';
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
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
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

// Z index use tracker
var highestZIndexUsed = 2;

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
		display_notification(post.sender, 'Changed name to ' + post.name.name);
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
			parent.focus(); // TODO this does not work in electron, make it work.
		};
	}else{ // the user is using the application
		display_success('<h1>'+title+'</h1><p>'+text+'</p>');
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

//////////   TRANSACTION PARSING, HANDLING AND MANIPULATION

// takes a transaction as input and returns a post after adding the post to posts cache
/* PARAMS:
- isLive: a boolean indicating if the transaction came in over WebSocket (true),
  or not (false).
*/
var parse_tx = function(input, isLive){
	var time = input.time;
	var tx_from_addr = input.vin[0].addr;
	var parent = 'none', code = 'none', data = 'none';
	for(var i = 0; i < input.vout.length; i++){ // for each output
		if(!input.vout[i].scriptPubKey.asm.startsWith('OP_RETURN')){
			if(parseInt(input.vout[i].value * 100000000) <= dustLimitSize
					&& parseInt(input.vout[i].value * 100000000) != 0){ // this is the parent reference output
				parent = input.vout[i].scriptPubKey.addresses[0];
			}
		}else{ // OP_RETURN data parsing
			code = input.vout[i].scriptPubKey.asm.substring(10, 14);
			data = input.vout[i].scriptPubKey.asm.substring(14, input.length);
			data = hex2a(data);
		}
	}
	if(parent != 'none' && code != 'none' && data != 'none'){
		var post = {
			type: code,
			sender: tx_from_addr,
			parent: parent,
			txid: input.txid,
			time: time,
			data: data,
			isLive: isLive
		};
		return new Promise(function(resolve, reject){
			init_post(post).then(function(updated_post){
				add_post_to_db(updated_post);
				resolve(updated_post);
			});
		});
	}
}


// Returns an array of UNIVO transactions by address, adding them to cache
/* TODO:
- A better way of handling multiple pages of transactions than just requesting
  the first 1000 from insight
*/
var get_transactions = function(addr){
	return new Promise(function(resolve, reject){
		var tx_arr = [];
		$.ajax({
			type: "GET",
			url: insightBaseURL + 'addr/' + addr + '?from=0&to=1000', // TODO a better solution than a hard limit
			success: function(data){
				for(var i = 0; i < data.transactions.length; i++){ // for each transaction
					get_tx(data.transactions[i]).then(function(tx){
						tx_arr.push(tx);
					});
				}
				resolve(tx_arr);
			}
		});
	});
}

// returns a UTXO suitable for spending given an address
// returns -1 if none are found (insufficient funds)
/* TODO:
- Return multiple small UTXOs if a large one is not found.
- Accept a bitcoincash.js transaction as a parameter, append the relevant UTXOs,
  then return the modified bitcoincash.js "bch.Transaction" object instead of 
  just the UTXO.
- Rename the function from find_utxo(address string) to add_utxos(bch.Transaction)
*/
var find_utxo = function(address){
	return new Promise(function(resolve, reject){
		$.ajax({
			type: "GET",
			url: insightBaseURL + 'addr/' + address.toString() + '/utxo',
			success: function(data){
				var utxo = -1;
				for(var i = 0; i < data.length; i++){
					if(data[i].satoshis > 1000){ // TODO other checks, precision
						utxo = {
							txId: data[i].txid,
							outputIndex: data[i].vout,
							address: data[i].address,
							script: data[i].scriptPubKey,
							satoshis: data[i].satoshis
						};
						resolve(utxo);
						i = data.length + 1; // stop loop
					}
				}
				resolve(utxo);
			}
		});
	});
}

// Sends a raw hex bitcoin transaction over the live network
var broadcast_tx = function(tx){
	if(debug){
		console.log('pretend broadcasting transaction (debug):\n\n'+tx+'\n\n');
	}else{
		$.ajax({
			type: "POST",
			url: insightBaseURL + 'tx/send',
			data: {rawtx: tx},
			success: function(data){
				console.log('TX broadcast successful.\nTX:\n\n'+tx+'\n\ntxid:\n\n: ' + data.txid+'\n\n');
			},
			error: function(data){
				var newString = '<h1>BROADCAST FAILURE</h1>';
				newString += '<p>Looks like this action was rejected by tne network for some reason... ';
				newString += 'Please give this to a developer so they can have a look, or post it on UNIVO ';
				newString += 'or somewhere we\'ll see it.</p><p>This is vary important to us, because it ';
				newString += 'just ruined your experience:</p><div class="UIPanel" style="font-family:monospace;">';
				newString += tx+'</div>'
				display_alert(newString);
			}
		});
	}
}

// Adds transaction to localStorage transactions cache, if it is not already there
var add_tx_to_db = function(tx){
	// get the tx db
	var transactions = JSON.parse(localStorage.transactions);
	// check if it exists
	for(var i = 0; i < transactions.length; i++){
		if(transactions[i].txid == tx.txid){
			if(debug){
				console.log('Not adding transaction, it is a duplicate.');
			}
			return;
		}
	}
	transactions.push(tx);
	localStorage.transactions = JSON.stringify(transactions);
}

// Returns a transaction given a TXID. first searches the cache, then the network
var get_tx = function(txid){
	return new Promise(function(resolve, reject){
		// check if it exists in the DB already
		var transactions = JSON.parse(localStorage.transactions);
		var success = false;
		for(var i = 0; i < transactions.length; i++){
			if(transactions[i].txid == txid){
				success = true;
				resolve(transactions[i]);
				return;
			}
		}
		if(!success){ // now we look it up on the network and then add it to DB.
			$.ajax({
				type: "GET",
				url: insightBaseURL + 'tx/' + txid,
				success: function(transaction){
					if(is_univo_tx(transaction)){
						add_tx_to_db(transaction);
						resolve(transaction);
					}else{
						resolve(-1);
					}
					return;
				}
			});
		}
	});
}

// Determines if the given transaction is a UNIVO transaction
var is_univo_tx = function(transaction){
	var parent = 'none', code = 'none';
	for(var i = 0; i < transaction.vout.length; i++){ // for each output
		if(!transaction.vout[i].scriptPubKey.asm.startsWith('OP_RETURN')){
			if(parseInt(transaction.vout[i].value * 100000000) <= dustLimitSize
					&& parseInt(transaction.vout[i].value * 100000000) != 0){ // this is the parent reference output
				parent = transaction.vout[i].scriptPubKey.addresses[0];
			}
		}else{ // OP_RETURN data parsing
			code = transaction.vout[i].scriptPubKey.asm.substring(10, 14);
		}
	}
	if(code.startsWith('55') && parent != 'none'){
		return true;
	}else{
		return false;
	}
}

//////////   POST PARSING, RENDERING AND MANIPULATION

// Adds a post to localStorage cache if it is not there
var add_post_to_db = function(post){
	// get posts from localStorage
	var posts = JSON.parse(localStorage.posts);
	// iterate posts, looking for matching TXIDs
	for(var i = 0; i < posts.length; i++){
		if(posts[i].txid == post.txid){
			if(debug){
				console.log('Not adding post with redundant TXID to database');
			}
			return;
		}
	}
	// no match in DB, we are good to add it
	posts.push(post);
	localStorage.posts = JSON.stringify(posts);
}

// Renders a post to the #posts div
/* TODO:
- [IMPORTANT] cross site scripting and other security/protection
- elementIndex: indicates where in the HTML the new post is rendered
- replyIndent [limited to 4?]: The level of indentation to apply to the post
- specify the container to add the post to instead of just #posts
- Other: different types depending on the type of post, sounds, click actions
*/
/* PARAMS
- pushToTop: boolean indicating if post should (true) or should not (false) be pushed to
  the top of the HTML instead of the bottom (default).
*/
var render_post = function(name, time, data, pushToTop = 0, tag = '#posts'){
	var post = $('<div class="post"></div>');
	var name_f = $('<p class="name"></p>');
	name_f.text(name.name);
	var time_f = $('<p class="time"></p>');
	time_f.text(time);
	var nameHash = $(name.hash);
	var container = $('<div></div>');
	container.append(nameHash);
	container.append(name_f);
	container.append(time_f);
	var text = $('<p class="postText"></p>');
	text.text(data);
	post.append(text);
	post.prepend(container);
	//var newString = '<div class="post"><div><p class="name">'+name+'</p>';
	//newString += '<p class="time">'+time+'</p></div>'+data+'</div>';
	if(pushToTop){
		$(tag).prepend(post);
	}else{tag
		$(tag).append(post);
	}
}

// Given a TXID, returns a post object
var get_post = function(txid){
	return new Promise(function(resolve, reject){
		// check if we have the post already in cache
		var posts = JSON.parse(localStorage.posts);
		var success = false;
		for(var i = 0; i < posts.length; i++){
			if(posts[i].txid == txid){
				success = true;
				resolve(posts[i]);
				return;
			}
		}
		if(!success){
			get_tx(txid).then(function(transaction){
				parse_tx(transaction).then(function(post){
					resolve(post);g
				});
			});
		}
	});
}

// Gets posts associated with an address
/* TODO:
- A better way of dealing with large numbers of posts, instead of just querying insight
  for the first 1000
*/
var get_posts = function(addr){
	return new Promise(function(resolve, reject){
		var post_arr = [];
		$.ajax({
			type: "GET",
			url: insightBaseURL + 'addr/' + addr + '?from=0&to=1000', // TODO a better solution than a hard limit
			success: function(data){
				for(var i = 0; i < data.transactions.length; i++){ // for each transaction
					get_tx(data.transactions[i]).then(function(tx){
						parse_tx(tx).then(function(post){
							post_arr.push(post);
						});
					});
				}
				resolve(post_arr);
			}
		});
	});
}


// Initial processing of posts. Assigns the name, finds number of replies, replyy depth etc.
var init_post = function(post){
	return new Promise(function(resolve, reject){
		get_name(post.sender).then(function(name){
			post.name = name;
			// notifications for live transactions
			if(post.isLive){
				parse_notification(post);
			}
			// we can also fetch image data, extended messages, parent transactions,
			// number of replies, tips etc in the same way based on tx type
			if(post.type == '5504'){ // set name of sender to their new name
				set_name(post.sender, post.data, post.time);
			}
			
			// pass it to the page we are on, so that page can decide how to display it
			if(typeof handle_new_post != undefined){
				handle_new_post(post);
			}
			resolve(post);
		});
	});
}

//////////   CACHING, GETTING AND SETTING NAMES

// Returns the name object given an address. Uses caching, returns first 6 of address if no name.
/* TODO:
- unique immutable hash symbol (color and shape) based on address to deter spoofing
*/
var get_name = function(addr){
	return new Promise(function(resolve, reject){
		var success = false;
		var names = JSON.parse(localStorage.names);
		// declare an empty default name just in case none exists
		var name = {address: addr, name: addr.substr(0, 6), time: 0, hash: get_name_hash(addr)};
		for(var i = 0; i < names.length; i++){
			if(names[i].address == addr){
				success = true;
				resolve(names[i]);
			}
		}
		if(!success){
			$.ajax({
				type: "GET",
				url: insightBaseURL + 'txs/?address=' + addr,
				success: function(data){
					var found_name = false;
					var d = data;
					var l = data.txs.length;
					for(var j = 0; j < l; j++){
						var input = d.txs[j];
						var time = input.time;
						for(var i = 0; i < input.vout.length; i++){
							if(!input.vout[i].scriptPubKey.asm.startsWith('OP_RETURN')) continue;
							code = input.vout[i].scriptPubKey.asm.substring(10, 14);
							data = input.vout[i].scriptPubKey.asm.substring(14, input.length);
							data = hex2a(data);
							if(code == '5504'){
								found_name = true;
								set_name(addr, data.substr(0, 24), time);
								name = data.substr(0, 24);
								get_name(addr).then(function(name){
									resolve(name);
								});
							}
						}
					}
					if(!found_name){
						// set_name(addr, addr.substr(0, 6), 0); // uncomment to reduce load on server
						resolve(name);
					}
				}
			});
		}
	});
}

// Sets a users name and decides if the new name should be kept based on timestamp
/* TODO:
- Check for and remove duplicate entries to prevent arbitrary results when cache is queried
*/
var set_name = function(addr, name, time){
	var names = JSON.parse(localStorage.names);
	var doesExist = false;
	for(var i = 0; i < names.length; i++){
		if(names[i].address == addr){
			doesExist = true;
			if(names[i].time < time){ // the stored value is old
				delete names[i];
				var new_name = {address: addr, name: name, time: time, hash: get_name_hash(addr)};
				// change all posts with this sender to the new name
				var posts = JSON.parse(localStorage.posts);
				for(var i = 0; i < posts.length; i++){
					if(posts[i].sender == addr){
						posts[i].name = new_name;
					}
				}
				localStorage.posts = JSON.stringify(posts);
				names[i] = new_name;
			}else{
				if(debug){
					console.log('Not adding name because it already exists.');
				}
			}
		}
	}
	if(!doesExist){
		var new_name = {address: addr, name: name, time: time, hash: get_name_hash(addr)};
		// change all posts with this sender to the new name
		var posts = JSON.parse(localStorage.posts);
		for(var i = 0; i < posts.length; i++){
			if(posts[i].sender == addr){
				posts[i].name = new_name;
			}
		}
		localStorage.posts = JSON.stringify(posts);
		names.push(new_name);
	}
	localStorage.names = JSON.stringify(names);
}

// Returns a unique "identicon" based on the address given
var get_name_hash = function(addr){
	var addr_h = sha512(addr).substr(0, 32);
	var data = new Identicon(addr_h).toString();
	var img = '<img class="UINameIcon" src="data:image/png;base64,' + data + '" alt="Real Address: '+addr+'" poster="Real Address: '+addr+'" />';
	return img;
}

//////////   FORMS AND EVENTS RELATED TO HOST PAGE

// listen for form submission and related events
var listen_forms = function(){
	// log out when a log out button ls clicked
	$('#logout').on('click', function(ev){
		ev.preventDefault();
		delete sessionStorage.privateKey;
		delete sessionStorage.insightBaseURL;
		window.location.href = 'login.html';
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
					newString += '<ul><li>Ask a friend to send you some Bitcoin Cash to your UNIVO address</li>';
					newString += '<li>You can get some from the free.bitcoin.com faucet</li>';
					newString += '<li>You can trade any cryptocurrency for Bitcoin Cash on ShapeShift</li>';
					newString += '<li>You can be tipped on sites like yours.org or Reddit (r/btc)</li>';
					newString += '<li>You can buy some on sites like coinbase.com or kraken.com</li>';
					display_alert(newString);
				}else{
					// create dummy tx to find approximate actual TX size with fee
					transaction = new bch.Transaction();
					transaction.from(utxo);
					transaction.to(address.toString(), utxo.satoshis - 768); // approximate
					transaction.to(central_posts_address, dustLimitSize)
					transaction.addData(hex2a('5501')+post_text)
					transaction.sign(privateKey);
					var tx_size = parseInt(transaction.toString().length/1.95); // fee threshold
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
					$('#newpost').text('');
				}
			});
		}
	});
}


/*

Why are we sending 547 satoshis to a central address?

So we can easily get all UNIVO transactions with insight.

Why not 1 satoshi, you ask?

THE FUCKING CODE DEVELOPERS HAVE IMPLEMENTED A SO-CALLED 'DUST-LIMIT'.
THIS LIMIT IS COMMUNIST-STYLE CENTRAL-PLANNING BULLSHIT.
If I want to send 1 satoshi to someone and pay 200 satoshis to do it,
I should be able to do so. its A FREE FUCKING MARKET ECONOMY!

Whether or not it "makes sense" should be up to NOBODY but me in a
permissionless system. UNIVO is a PERFECTLY VALID reason for doing this,
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