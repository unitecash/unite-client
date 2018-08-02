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

import $ from 'jquery'
window.jQuery = $
window.$ = $
import bchaddr from 'bchaddrjs'
window.bchaddr = bchaddr
import bitcoincash from 'bitcoincashjs'
window.bch = bitcoincash
import './lib/pnglib.js'
import './lib/identicon.js'
import io from 'socket.io-client'
window.io = io
import './lib/sha512.js'
import IPFS from 'ipfs'
window.IPFS = IPFS

import Config from './Config'
window.Config = Config
import Utilities from './Utilities'
window.Utilities = Utilities
import Logger from './Logger'
window.Logger = Logger
window.log = window.Logger.log
window.error = window.Logger.error
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
import BalanceWindow from './UI/BalanceWindow'
window.BalanceWindow = BalanceWindow
import TipWindow from './UI/TipWindow'
window.TipWindow = TipWindow
import ImageButton from './UI/ImageButton'
window.ImageButton = ImageButton
import NavigationMenu from './UI/NavigationMenu'
window.NavigationMenu = NavigationMenu
import CompositionWindow from './UI/CompositionWindow'
window.CompositionWindow = CompositionWindow

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
import Notification from './Notification'
window.AppNotification = Notification
import NotificationManager from './NotificationManager'
window.NotificationManager = NotificationManager
import FormManager from './FormManager'
window.FormManager = FormManager
import PostBuilder from './PostBuilder'
window.PostBuilder = PostBuilder
import User from './User'
window.User = User

export default class App {
  constructor () {
    window.config = new Config()
    // if the user is logged in
    if (sessionStorage.privateKey !== undefined) {
      $(document).ready(() => {
        window.notificationManager = new NotificationManager()
        window.formManager = new FormManager()
        new NetworkManager().then((networkManager) => {
          window.networkManager = networkManager
          if (typeof pageInit !== 'undefined') {
            pageInit()
          }
        })
      })
    } else { // user is not logged in
      // if we are not at login.html then redirect there
      if (window.location.pathname.split('/').pop() != 'login.html') {
        Utilities.redirect('login.html')
      }
    }
  }
}

window.app = new App()
