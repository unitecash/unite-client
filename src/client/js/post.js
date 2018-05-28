/**
 * Post
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * A class for storing data related to the contents of posts
 *
 * @file Provides the Post class
 */

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
- elementIndex: indicates where in the HTML the new post is rendered
- replyIndent [limited to 4?]: The level of indentation to apply to the post
*/
/* PARAMS
- pushToTop: boolean indicating if post should (true) or should not (false) be pushed to
  the top of the HTML instead of the bottom (default).
*/
var render_post = function(post, pushToTop = 0, tag = '#posts'){
	if(post.type != 5501 && post.type != 5502 && post.type != 5503 && post.type != 5505) return;
	var uid = post.txid.substr(0, 16);
	var postDiv = $('<div id="'+uid+'div" class="post"></div>');
	var nameText = $('<p id="'+uid+'name" class="name"></p>');
	nameText.text(post.name.name);
	var timeText = $('<p id="'+uid+'time" class="time"></p>');
	timeText.text(post.time);
	var nameHash = $(post.name.hash);
	var container = $('<div></div>');
	container.append(nameText);
	container.append(nameHash);
	container.append(timeText);
	var postText = $('<div id="'+uid+'content" class="postText"></div>');
	var actionBar = $('<div class="actionBar"></div>');
	actionBar.append($('<p id="'+uid+'reply" class="UITextButton">reply</p>'));
	actionBar.append($('<p id="'+uid+'viewreply" class="UITextButton">show replies</p>'));
	actionBar.append($('<p id="'+uid+'tip" class="UITextButton">tip</p>'));
	actionBar.append($('<p id="'+uid+'report" class="UITextButton">report</p>'));
	postText.text(post.displayContent);
	postDiv.append(postText);
	postDiv.prepend(container);
	postDiv.append(actionBar);
	if(pushToTop){
		$(tag).prepend(postDiv);
	}else{
		$(tag).append(postDiv);
	}
	var newString = '<div id="'+uid+'tipwindow" class="UIAlertWindow hidden">';
	newString += '<h1>SEND A TIP</h1>';
	newString += '<p>Show how much you appreciate ' + post.name.name + '\'s post by sending a tip!</p>';
	newString += '<form id="'+uid+'tipform">';
	newString += '<input type="text" id="'+uid+'tipamount" class="UITextField center w90"';
	newString += 'placeholder="Amount (satoshis)" /><br/>';
	newString += '<input type="submit" class="UIButton center w90" value="SEND" />';
	newString += '</form></div>';
	$('body').append($(newString));
	$('#'+uid+'name').on('click', function(){
		window.location.href = 'user.html?address='+post.sender;
	});
	$('#'+uid+'viewreply').on('click', function(){
		window.location.href = 'post.html?post='+post.txid;
	});
	$('#'+uid+'tip').on('click', function(){
		display_html_alert('#'+uid+'tipwindow');
	});
	$('#'+uid+'tipform').on('submit', function(ev){
		ev.preventDefault();
		var tipAmount = $('#'+uid+'tipamount').val();
		document.elementFromPoint(10, 10).click();
		if(post.sender == address.toString()){
			display_alert('<h1>NARCISSISM?</h1><p>You just tried to tip yourself. You failed. Miserably.</p>');
		}else{
			find_utxo(address.toString(), tipAmount).then(function(utxo){
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
					transaction.to(address.toString(), utxo.satoshis - tipAmount - 300); // approximate
					transaction.to(post.sender, parseInt(tipAmount))
					transaction.addData(hex2a('5503') + hex2a(post.txid));
					transaction.sign(privateKey);
					var tx_size = parseInt(transaction.toString().length/feeThreshold); // fee threshold
					// recreate transaction with correct fee
					transaction = new bch.Transaction();
					transaction.from(utxo);
					transaction.to(address.toString(), utxo.satoshis - tipAmount - tx_size); // approximate
					transaction.to(post.sender, parseInt(tipAmount))
					transaction.addData(hex2a('5503') + hex2a(post.txid));
					transaction.sign(privateKey);
					console.log(transaction.toString());
					//broadcast_tx(transaction.toString());
					display_success('Your tip has been sent!');
					swooosh();
					$('#'+uid+'tipamount').val('');
				}
			});
		}
	});
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
					resolve(post);
				});
			});
		}
	});
}

// Gets posts associated with an address
var get_posts = function(addr){
	get_transactions(addr).then(function(tx_arr){
		for(var i = 0; i < tx_arr.length; i++){ // for each transaction
			parse_tx(tx_arr[i]);
		}
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
			if(post.type == '5503'){
				post.displayContent = post.data.substr(46);
			}
			if(post.type == '5501'){
				post.displayContent = post.data;
			}
			if(post.type == '5502'){
				// for this type, the post.data is a magnet link.
				// post.displayContent will be the contents of the torrent. (get it from webtorrent/webseed)
			}

			// pass it to the page we are on, so that page can decide how to display it
			if(typeof handle_new_post != undefined){
				handle_new_post(post);
			}
			resolve(post);
		});
	});
}

// Returns an array of posts which are replies to the given post // incomplete and posibly permanently deprecated
var get_replies = function(post){
	return new Promise(function(resolve, reject){
		var post_arr = [];
		get_posts(post.sender).then(function(posts){
			for(var i = 0; i < posts.length; i++){
				if(posts[i].parent == post.sender){
					if(posts[i].type == 5503){
						console.log(posts[i].data.substr(0, 64));
						console.log(post.txid);
						if(posts[i].data.substr(0, 64) == post.txid){
							post_arr.push(posts[i]);
						}
					}
				}
			}
			resolve(post_arr);
		});
	});
}
