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
import Messages from './UI/Messages'
window.Messages = Messages
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
    this.init()
	}

  init () {
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

			window.notificationManager = new NotificationManager()
			window.networkManager = new NetworkManager()
			window.formManager = new FormManager()

			// call the data loading function present on host pages responsible for
			// displaying dynamic content
			if(typeof appInit != 'undefined') {
				appInit()
			}
		}else{ // In case the user was not logged in
			if(window.location.pathname.split('/').pop() != 'login.html') {
				// redirect the user to login.html unless they were already there
				Utilities.redirect('login.html')
			}
		}

  }

}

window.app = new App()
