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
    this.CENTRAL_CONTENT_ADDRESS = bchaddr.toCashAddress('1HBqvcE3jArLxTe4p2KRaDsRHHtEaqG66z')
    this.CENTRAL_PROFILE_ADDRESS = bchaddr.toCashAddress('1B4wyiAP3xYx2H8AqMqrwdMfbw7YwFd4C3')
    this.CENTRAL_GROUPS_ADDRESS =  bchaddr.toCashAddress('14F1NbudfgRyEzau29HpexQPzHkghbWUKR')
    this.CENTRAL_REPORT_ADDRESS =  bchaddr.toCashAddress('12xemQTP98jgkAUGuGqHghdVSufqR7htjY')

    this.DUST_LIMIT_SIZE = 547
    this.DEFAULT_FEE_PER_BYTE = 1.05
    this.MAX_HASH_DESCRIPTOR_SIZE = 4096

    this.ENABLE_WEBSOCKETS = true
    this.ENABLE_CACHING = true
    this.ENABLE_TRANSACTION_BROADCASTS = true
    this.DEBUG_MODE = true

    this.DEFAULT_NETWORK_ENDPOINTS = [
      {
        insightURL: 'https://bitcoincash.blockexplorer.com/api/',
        websocketURL: 'wss://bitcoincash.blockexplorer.com',
        addressFormat: 'legacy'
      },
      {
        insightURL: 'https://bch-insight.bitpay.com/api/',
        websocketURL: 'wss://bch-insight.bitpay.com',
        addressFormat: 'cashaddress'
      }
    ]

    this.DEFAULT_IPFS_ENDPOINTS = [
      'https://ipfs.io/ipfs/',
      'https://gateway.ipfs.io/ipfs/',
      'https://ipfs.infura.io/ipfs/',
      'https://www.eternum.io/ipfs/',
      'https://ipfs.works/ipfs/',
      'https://ipfs.work/ipfs/'
    ]

    if (this.ENABLE_CACHING === false) {
      localStorage.clear()
    }

    if (typeof localStorage.networkEndpoints === 'undefined') {
  		localStorage.networkEndpoints = JSON.stringify(
        this.DEFAULT_NETWORK_ENDPOINTS
      )
  	}
    this.networkEndpoints = JSON.parse(localStorage.networkEndpoints)

    if (typeof localStorage.IPFSEndpoints === 'undefined') {
      localStorage.IPFSEndpoints = JSON.stringify(
        this.DEFAULT_IPFS_ENDPOINTS
      )
    }
    this.IPFSEndpoints = JSON.parse(localStorage.IPFSEndpoints)

    if (typeof sessionStorage.privateKey !== 'undefined') {
      this.userPrivateKey = bch.PrivateKey.fromWIF(sessionStorage.privateKey)
      this.userAddress = Utilities.stripAddressPrefix (
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
  }

}
