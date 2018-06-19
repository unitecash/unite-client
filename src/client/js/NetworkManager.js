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
    this.isDead = false
    this.isIPFSReady = false

    if (config.ENABLE_WEBSOCKETS) {
      // connect to a WebSocket
      this.socketStream = io(config.randomInsightWebsocket())
      this.socketStream.on('connect', () => {
        // TODO: an array of addresses the user subscribes to, iterating each one.

        this.subscribeAddress('inv')
        this.bindEvents()
      })
    }

    // start IPFS
    //this.IPFSNode = new IPFS()

    /*this.IPFSNode.on('ready', () => {
      if (config.DEBUG_MODE) {
        console.log('IPFS is ready!')
      }
      this.isIPFSReady = true
      this.IPFSNode.version((err, version) => {
        if (err) { console.error(err) }
        if (config.DEBUG_MODE) {
          console.log('IPFS Version:', version.version)
        }

        // connect to the IPFS peers
        for (var i = 0; i < config.ipfsEndpointsArray.length; i++){
          //this.IPFSNode.swarm.connect(config.ipfsEndpointsArray[i])
        }
      })
    })*/
  }

  bindEvents () {
    this.socketStream.on('tx', (data) => {
      new Transaction(data.txid, {
        isLive: true
      })
    })
  }

  subscribeAddress (addr) {
    this.socketStream.emit('subscribe', addr)
  }

  unsubscribeAddress (addr) {
    this.socketStream.emit('unsubscribe', addr)
  }

  disconnect () {
    this.isDead = true
    this.socketStream.disconnect()
  }

  broadcastTransaction (hex) {
    if (!this.isDead) {
      if(config.DEBUG_MODE === false) {
        for (var i = 0; i < config.DEFAULT_INSIGHT_ENDPOINTS_ARRAY; i++) {
          $.ajax({
            type: 'POST',
            url: config.DEFAULT_INSIGHT_ENDPOINTS_ARRAY[i] + 'tx/send',
            data: {rawtx: hex},
            success: function (data) {
              console.log('Broadcasted! TXID:\n\n' + data.txid)
            },
            error: function (data) {
              Messages.broadcastFailure(hex)
            }
          })
        }
      } else {
        console.log('Pretend broadcasting TX:\n\n' + hex)
      }
    }
  }


  getBalance (addr) {
    return new Promise ((resolve, reject) => {
      if (!this.isDead) {
        $.ajax({
          type: 'GET',
          url: config.randomInsightEndpoint() + 'addr/' + addr,
          success: (data) => {
            resolve (data.balance)
          }
        })
      } else {
        resolve (false)
      }
    })
  }

  findCommonTransactions (addr1, addr2) {
    return new Promise((resolve, reject) => {
      if (!this.isDead) {
        $.ajax({
          type: 'GET',
          url: config.randomInsightEndpoint() + 'addr/' + addr1 + '?from=0&to=1000',
          success: (data1) => {
            $.ajax({
              type: 'GET',
              url: config.randomInsightEndpoint() + 'addr/' + addr2 + '?from=0&to=1000',
              success: (data2) => {
                resolve(data1.transactions.filter(value => -1 !== data2.transactions.indexOf(value)))
              },
              error: (data) => {
                resolve (false)
              }
            })
          },
          error: (data) => {
            resolve (false)
          }
        })
      } else {
        resolve (false)
      }
    })
  }

  lookupTXID (txid) {
    return new Promise((resolve, reject) => {
      if (!this.isDead) {
        $.ajax({
          type: 'GET',
          url: config.randomInsightEndpoint () + 'tx/' + txid,
          success: (transaction) => {
            resolve(transaction)
          },
          error: () => {
            resolve(false)
          }
        })
      }
    })
  }

  findUTXOsByAddress (address) {
    return new Promise((resolve, reject) => {
      if (!this.isDead) {
        $.ajax({
          type: 'GET',
          url: config.randomInsightEndpoint() + 'addr/' + address + '/utxo',
          success: (data) => {
            resolve (data)
          },
          error: () => {
            resolve (false)
          }
        })
      } else {
        resolve (false)
      }
    })
  }

  // Adds a file to IPFS with the data provided, notifying pin-servers who will
  // then pin the content for reliable access.
  publishToIPFS (data) {
    return new Promise ((resolve, reject) => {
      if (this.isIPFSReady && !this.isDead) {
        this.IPFSNode.files.add({
          path: '',
          content: Buffer.from(data)
        }, (err, filesAdded) => {
          if (err) { console.error(err) }
          if (config.DEBUG_MODE) {
            console.log('Added to IPFS:', filesAdded[0].hash)
          }
          resolve (filesAdded[0].hash)
        })
      } else if (!this.isIPFSReady) {
        // TODO wait 2 seconds for IPFS to be ready, then try again
        if (config.DEBUG_MODE) {
          console.log('IPFS was not ready, waiting 2 seconds...')
        }
        resolve (false)
      }
    })
  }

  // Retrieves a file's contents from IPFS
  retrieveFromIPFS (hash) {
    return new Promise ((resolve, reject) => {
      if (this.isIPFSReady && !this.isDead) {
        this.IPFSNode.files.cat(hash).then((data) => {
          resolve (data.toString())
        })
      } else {
        resolve (false)
      }
    })
  }

}
