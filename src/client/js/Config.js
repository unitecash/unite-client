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

    this.ENABLE_WEBSOCKETS = true

    this.DEBUG_MODE = true

    this.DEFAULT_INSIGHT_ENDPOINTS_ARRAY = [
      //'https://bitcoincash.blockexplorer.com/api/',
      'https://bch-insight.bitpay.com/api/'
    ]

    this.DEFAULT_INSIGHT_WEBSOCKETS_ARRAY = [
      //'wss://bitcoincash.blockexplorer.com',
      'wss://bch-insight.bitpay.com'
    ]

    this.DEFAULT_IPFS_ENDPOINT_ARRAY = [
      '/ip4/127.0.0.1/tcp/9999/ws/ipfs/QmbpX2EBFU9wYQ2hRg93mn6rm7pYyNJGrEkn8XJ3TK2FVB',

    ]

    // clear the localStorage when debug is enabled to get the latest defaults
    if (this.DEBUG_MODE) {
      localStorage.clear()
    }

    if (typeof localStorage.insightEndpointsArray === 'undefined') {
  		localStorage.insightEndpointsArray = JSON.stringify(
        this.DEFAULT_INSIGHT_ENDPOINTS_ARRAY
      )
  	}

  	if (typeof localStorage.insightWebsocketsArray === 'undefined') {
      localStorage.insightWebsocketsArray = JSON.stringify(
        this.DEFAULT_INSIGHT_WEBSOCKETS_ARRAY
      )
    }

    if (typeof localStorage.ipfsEndpointsArray === 'undefined') {
      localStorage.ipfsEndpointsArray = JSON.stringify(
        this.DEFAULT_IPFS_ENDPOINT_ARRAY
      )
    }

    this.insightEndpointsArray = JSON.parse(
      localStorage.insightEndpointsArray
    )
    this.insightWebsocketsArray = JSON.parse(
      localStorage.insightWebsocketsArray
    )
    this.ipfsEndpointsArray = JSON.parse(
      localStorage.ipfsEndpointsArray
    )

    if (typeof sessionStorage.privateKey !== 'undefined') {
      this.userPrivateKey = bch.PrivateKey.fromWIF(sessionStorage.privateKey)
      this.userAddress = bchaddr.toCashAddress(this.userPrivateKey.toAddress().toString()).substr(12)
    }

    // ensure the localStorage data structures are defined
    if (typeof localStorage.names === 'undefined') {
      var names = []
      localStorage.names = JSON.stringify(names)
    }
    if (typeof localStorage.transactions === 'undefined') {
      var transactions = []
      localStorage.transactions = JSON.stringify(transactions)
    }

    this.highestZIndexUsed = 2
  }

  randomInsightEndpoint () {
    return Utilities.getRandomFromArray (this.insightEndpointsArray)
  }

  randomInsightWebsocket () {
    return Utilities.getRandomFromArray (this.insightWebsocketsArray)
  }

}
