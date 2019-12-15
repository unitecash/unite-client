import bchaddr from 'bchaddrjs'
import bch from 'bitcore-lib-cash'

/**
 * Configuration
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * Defines configuration options and user preferences.
 * Sets defaults and helps set up data structures for caching in localStorage
 *
 * @file Defines the Config class
 */

export default class Config {
  constructor () {

    // Unite network-wide constants
    this.CENTRAL_CONTENT_ADDRESS = bchaddr.toCashAddress('1HBqvcE3jArLxTe4p2KRaDsRHHtEaqG66z')
    this.CENTRAL_PROFILE_ADDRESS = bchaddr.toCashAddress('1B4wyiAP3xYx2H8AqMqrwdMfbw7YwFd4C3')
    this.CENTRAL_GROUPS_ADDRESS =  bchaddr.toCashAddress('14F1NbudfgRyEzau29HpexQPzHkghbWUKR')
    this.CENTRAL_REPORT_ADDRESS =  bchaddr.toCashAddress('12xemQTP98jgkAUGuGqHghdVSufqR7htjY')

    // blockchain-specific settings
    this.DUST_LIMIT_SIZE = 547
    this.DEFAULT_FEE_PER_BYTE = 1.05

    // consensus rules for valid Unite posts
    this.MAX_HASH_DESCRIPTOR_SIZE = 4096

    // client-side configuration settings
    this.ENABLE_WEBSOCKETS = true
    this.ENABLE_CACHING = true
    this.ENABLE_TRANSACTION_BROADCASTS = true

    // debug logging
    this.DEBUG_MODE = true
    this.LOGGING_CATEGORIES = [
      'net',
      //'ipfs',
      //'post',
      //'tx',
      //'name',
      //'notif',
      'builder',
      'user',
      'ui',
      'util'
    ]

    // endpoints for interfacing with the blockchain
    this.DEFAULT_NETWORK_ENDPOINTS = [
      {
        insightURL: 'https://bitcoincash.blockexplorer.com/api/',
        websocketURL: 'wss://bitcoincash.blockexplorer.com',
        addressFormat: 'legacy'
      }//, COMMENTED OUT TEMPORARILY TO AVOID ISSUES
      //{
      //  insightURL: 'https://bch-insight.bitpay.com/api/',
      //  websocketURL: 'wss://bch-insight.bitpay.com',
      //  addressFormat: 'cashaddress'
      //},
      //{
      //  insightURL: 'https://blockdozer.com/insight-api/',
      //  addressFormat: 'cashaddress'
      //}
    ]

    // endpoints for interfacing with IPFS
    this.DEFAULT_IPFS_ENDPOINTS = [
      'https://ipfs.io/ipfs/',
      'https://gateway.ipfs.io/ipfs/',
      'https://ipfs.infura.io/ipfs/',
      'https://www.eternum.io/ipfs/',
      'https://ipfs.works/ipfs/',
      'https://ipfs.work/ipfs/'
    ]

    // content publication endpoints
    this.DEFAULT_UNITE_ENDPOINTS = [
      'https://unite.cash:5501/'
      //'https://alpha.unite.cash/', [HELP WANTED]  INFRASTRUCTURE NEEDED
      //'https://beta.unite.cash/',
      //'https://gamma.unite.cash/',
      //'https://delta.unite.cash/',
      //'https://epsilon.unite.cash/',
      //'http://blahblahblahblah.onion/',
    ]

    // clear cache when caching is disabled
    if (this.ENABLE_CACHING === false) {
      localStorage.clear()
    }

    // load default configuration if none exists
    //if (typeof localStorage.networkEndpoints === 'undefined') {
  		localStorage.networkEndpoints = JSON.stringify(
        this.DEFAULT_NETWORK_ENDPOINTS
      )
  	//}
    this.networkEndpoints = JSON.parse(localStorage.networkEndpoints)

    //if (typeof localStorage.IPFSEndpoints === 'undefined') {
      localStorage.IPFSEndpoints = JSON.stringify(
        this.DEFAULT_IPFS_ENDPOINTS
      )
    //}
    this.IPFSEndpoints = JSON.parse(localStorage.IPFSEndpoints)

    //if (typeof localStorage.uniteEndpoints === 'undefined') {
      localStorage.uniteEndpoints = JSON.stringify(
        this.DEFAULT_UNITE_ENDPOINTS
      )
    //}
    this.uniteEndpoints = JSON.parse(localStorage.uniteEndpoints)

    // re-construct the private key from storage
    if (typeof sessionStorage.privateKey !== 'undefined') {
      this.userPrivateKey = bch.PrivateKey.fromWIF(sessionStorage.privateKey)
      this.userAddress = window.Utilities.stripAddressPrefix (
        bchaddr.toCashAddress (
          this.userPrivateKey.toAddress().toString()
        )
      )
    }

    // ensure the localStorage caching data structures are defined
    if (typeof localStorage.names === 'undefined') {
      var names = []
      localStorage.names = JSON.stringify(names)
    }
    if (typeof localStorage.transactions === 'undefined') {
      var transactions = []
      localStorage.transactions = JSON.stringify(transactions)
    }

    // highest Z index used by dialog boxes in the CSS [hacky, TODO get rid of.]
    this.highestZIndexUsed = 2

    // An array to keep track of rendered posts (to avoid duplications)
    window.currentPosts = []
  }

}
