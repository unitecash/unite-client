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

// import dependencies

// React
import React from 'react'
window.React = React
import ReactDOM from 'react-dom'
window.ReactDOM = ReactDOM

// JQuery TODO remove, use React for rendering and XMLHttpRequest for AJAX
import $ from 'jquery'
window.jQuery = $
window.$ = $

// PolyFill (for async-series) TODO remove this if possible
import 'babel-polyfill'

// Bitcoin Cash Address Conversions
import bchaddr from 'bchaddrjs'
window.bchaddr = bchaddr

// Bitcoincash.js
import bitcoincash from 'bitcoincashjs'
window.bch = bitcoincash

// Identicons TODO move to a npm package for this
import './lib/pnglib.js'
import './lib/identicon.js'
window.Identicon = Identicon

// Socket.io TODO remove if possible, check Insight ref. Use WebSockets
import io from 'socket.io-client'
window.io = io

// window.sha512() (TODO remove, use WebCryptoAPI)
import './lib/sha512.js'

// IPFS (TODO remove, only need the file hash calulator)
import IPFS from 'ipfs'
window.IPFS = IPFS

// master stylesheet (TODO modularize to components)
import style from './styles/style.css'

// configuration, utilities, loggers, messages
import Config from './Config'
window.Config = Config
import Utilities from './Utilities'
window.Utilities = Utilities
import Logger from './Logger'
window.Logger = Logger
window.log = window.Logger.log
window.error = window.Logger.error
// TODO a complete "strings" file for multilingual support
import Messages from './UI/Messages'
window.Messages = Messages
import Notification from './Notification'
window.AppNotification = Notification
import NotificationManager from './NotificationManager'
window.NotificationManager = NotificationManager

// Popups, banners and basic UI
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
import ImageButton from './UI/ImageButton'
window.ImageButton = ImageButton

// Windows and dialog boxes
import SettingsWindow from './UI/SettingsWindow'
window.SettingsWindow = SettingsWindow
import NameChangeWindow from './UI/NameChangeWindow'
window.NameChangeWindow = NameChangeWindow
import BalanceWindow from './UI/BalanceWindow'
window.BalanceWindow = BalanceWindow
import TipWindow from './UI/TipWindow'
window.TipWindow = TipWindow
import NavigationMenu from './UI/NavigationMenu'
window.NavigationMenu = NavigationMenu
import CompositionWindow from './UI/CompositionWindow'
window.CompositionWindow = CompositionWindow

// Unite primitives, data structures and their managers
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
import NetworkEndpoint from './NetworkEndpoint'
window.NetworkEndpoint = NetworkEndpoint
import IPFSEndpoint from './IPFSEndpoint'
window.IPFSEndpoint = IPFSEndpoint

import PostBuilder from './PostBuilder'
window.PostBuilder = PostBuilder
import User from './User'
window.User = User

// TODO eliminate FormManager and use component event handlers
import FormManager from './FormManager'
window.FormManager = FormManager

export default class App {
  constructor () {
    $(document).ready(() => { // wait until page is loaded to do anything

      window.config = new Config()
      window.notificationManager = new NotificationManager()
      window.formManager = new FormManager() // TODO get rid of completely.
      new NetworkManager().then((networkManager) => {
        window.networkManager = networkManager

        // if the user is logged in
        if (sessionStorage.privateKey !== undefined) {
          // run the page-specific initialization if it exists
          if (typeof pageInit !== 'undefined') {
            pageInit()
          }
        } else { // user is not logged in
          // if we are not at login.html then redirect there
          if (!window.location.pathname.endsWith('login.html')) {
            Utilities.redirect('login.html')
          }
        }
      })
    })
  }
}

window.app = new App()
