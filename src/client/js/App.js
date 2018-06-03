/**
 * Unite Client Implementation
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * This script provides the frameworks for the implementation of the Unite
 * protocol which is outlined in the protocol documentation.
 *
 * @file Provides the App class.
 */

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

import Utilities from './Utilities'
window.Utilities = Utilities
import Popup from './UI/Popup'
window.Popup = Popup
import InteractivePopup from './UI/InteractivePopup'
window.InteractivePopup = InteractivePopup
import Banner from './UI/Banner'
window.Banner = Banner
import ErrorBanner from './UI/ErrorBanner'
window.ErrorBanner = ErrorBanner
import SuccessBanner from './UI/SuccessBanner'
window.SuccessBanner = SuccessBanner
import Transaction from './Transaction'
window.Transaction = Transaction
import TransactionManager from './TransactionManager'
window.TransactionManager = TransactionManager
import Post from './Post'
window.Post = Post
import PostManager from './PostManager'
window.PostManager = PostManager
import Name from './Name'
window.Name = Name
import NameManager from './NameManager'
window.NameManager = NameManager
import NetworkManager from './NetworkManager'
window.NetworkManager = NetworkManager

// set up some useful global constants
const CENTRAL_CONTENT_ADDRESS     = '1HBqvcE3jArLxTe4p2KRaDsRHHtEaqG66z'
const CENTRAL_PROFILE_ADDRESS     = '1B4wyiAP3xYx2H8AqMqrwdMfbw7YwFd4C3'
const CENTRAL_GROUPS_ADDRESS      = '14F1NbudfgRyEzau29HpexQPzHkghbWUKR'
const CENTRAL_REPORT_ADDRESS      = '12xemQTP98jgkAUGuGqHghdVSufqR7htjY'

const DUST_LIMIT_SIZE = 547;
const FEE_RATIO = 1.95;

const DEBUG_MODE = false

export default class App {

	constructor () {
		this.userPrivateKey
		this.userAddress
		this.userDisplayName
		this.insightBaseURL
		this.websock
		this.highestZIndexUsed = 2
    this.preformStartup()
	}

  preformStartup(){
    // check to see if the user has logged in yet
		if(sessionStorage.privateKey !== undefined){

			this.insightBaseURL = sessionStorage.insightBaseURL
			this.userPrivateKey = bch.PrivateKey.fromWIF(sessionStorage.privateKey)
			this.userAddress = this.userPrivateKey.toAddress()

			// Check that the localStorage data structures were defined
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

			new NotificationManager()

			new NetworkManager()

			// go back or close dialog when user presses escape/back
			$(document).on('keydown', function(e) {
				if (e.keyCode == 27){
					Utilities.goBack()
				}
			})

			// listen for submit events from forms which are on the host page
			this.listen_forms()

			// call the data loading function present on host pages responsible for
			// displaying dynamic content
			if(typeof appInit != 'undefined'){
				appInit()
			}

		}else{ // In case the user was not logged in

			if(window.location.pathname.split('/').pop() != 'login.html'){
				// redirect the user to login.html unless they were already there
				location.href = 'login.html'
			}

		}

  }

		// returns GET parameters from the URL
		find_get_parameter(parameterName) {
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
		listen_forms(){
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

}

window.app = new App()
