/**
 * Network Manager
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * Establishes and manages connections with block explorers, WebSocket Servers
 * and WebTorrent seeders.
 *
 * @file Defines the NetworkManager class
 */

export default class NetworkManager {
  /*
  * @constructor
  *
  * Set up and connect to block explorers and WebSockets
  *
  */
  constructor () {
    // connect to the WebSocket
    this.socketStream = io(sessionStorage.webSocketEndpoint)
    this.socketStream.on('connect', () => {
      // TODO: an array of addresses the user subscribes to, iterating each one.

      this.subscribeAddress('inv')
      this.bindEvents()
    })
  }

  bindEvents () {
    this.socketStream.on('tx', (data) => {
      // new Transaction(data.txid)
    })
  }

  subscribeAddress (addr) {
    this.socketStream.emit('subscribe', addr)
  }

  unsubscribeAddress (addr) {
    this.socketStream.emit('unsubscribe', addr)
  }

  disconnect () {
    this.socketStream.disconnect()
  }

  broadcastTransaction (hex) {
    $.ajax({
      type: 'POST',
      url: config.randomInsightEndpoint() + 'tx/send',
      data: {rawtx: hex},
      success: function (data) {
        console.log('TX broadcast successful.\nTX:\n\n' + tx + '\n\ntxid:\n\n: ' + data.txid + '\n\n')
      },
      error: function (data) {
        Messages.broadcastFailure(hex)
      }
    })
  }

  

}
