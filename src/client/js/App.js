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
window.bchaddr = bchaddr
import bitcoincash from './lib/bitcoincash.js'
window.bch = bitcoincash
import './lib/pnglib.js'
import './lib/identicon.js'
import io from './lib/socket.io.js'
window.io = io
import './lib/sha512.js'
import './lib/webtorrent.js'

import Config from './Config'
window.Config = Config
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

import SettingsWindow from './UI/SettingsWindow'
window.SettingsWindow = SettingsWindow
import NameChangeWindow from './UI/NameChangeWindow'
window.NameChangeWindow = NameChangeWindow

import Transaction from './Transaction'
window.Transaction = Transaction
import TransactionManager from './TransactionManager'
window.TransactionManager = TransactionManager
import Post from './Post'
window.Post = Post
import Name from './Name'
window.Name = Name
import NameManager from './NameManager'
window.NameManager = NameManager
import NetworkManager from './NetworkManager'
window.NetworkManager = NetworkManager
import Notification from './Notification'
window.AppNotification = Notification
import NotificationManager from './NotificationManager'
window.NotificationManager = NotificationManager
import FormManager from './FormManager'
window.FormManager = FormManager
import PostBuilder from './PostBuilder'
window.PostBuilder = PostBuilder

export default class App {
  constructor () {
    window.config = new Config()
    if (sessionStorage.privateKey !== undefined) {
      $(document).ready(() => {
        window.notificationManager = new NotificationManager()
        window.networkManager = new NetworkManager()
        window.formManager = new FormManager()
        if (typeof pageInit !== 'undefined') {
          pageInit()
        }
      })
    } else {
      if (window.location.pathname.split('/').pop() != 'login.html') { // endsWith
        Utilities.redirect('login.html')
      }
    }
  }
}

window.app = new App()
