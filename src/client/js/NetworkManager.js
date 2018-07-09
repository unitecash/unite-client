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
    return new Promise ((resolve, reject) => {
      this.isDead = false
      this.isIPFSReady = false

      // select a NetworkEndpoint to use for this page
      new NetworkEndpoint(
        Utilities.getRandomFromArray(
          config.networkEndpoints
        )
      ).then((result) => {
        if (result !== false) {
          this.endpoint = result
          if (config.DEBUG_MODE) {
            console.log (
              'NetworkManager.constructor:',
              'Successfully connected to Insight!\n',
              this.endpoint
            )
          }
          this.endpoint.bindEvents()

          // Start IPFS
          this.IPFSNode = new IPFS({
            repo: String(Math.random + Date.now())
          })

          this.IPFSNode.on('ready', () => {
            if (config.DEBUG_MODE) {
              console.info('IPFS is ready!')
            }
            this.isIPFSReady = true
            this.IPFSNode.version((err, version) => {
              if (err) { console.error(err) }
              if (config.DEBUG_MODE) {
                console.info('IPFS Version:', version.version)
              }
              // connect to the IPFS peers
              for (var i = 0; i < config.IPFSEndpoints.length; i++){
                this.IPFSNode.swarm.connect(config.IPFSEndpoints[i])
              }

              // At this point in time the network should be ready for use.

              resolve (this)

            })
          })
        } else {
          if (config.DEBUG_MODE) {
            console.log ('Failed to connect to Insight')
          }
        }
      })
    })
  }

  broadcastTransaction (hex) {
    if (!this.isDead) {
      if(config.ENABLE_TRANSACTION_BROADCASTS === true) {
        for (var i = 0; i < config.networkEndpoints; i++) {
          $.ajax({
            type: 'POST',
            url: config.networkEndpoints[i].insightURL + 'tx/send',
            data: {rawtx: hex},
            success: (data) => {
              console.log('Transaction broadcasted! TXID:\n\n' + data.txid)
            },
            error: (data) => {
              Messages.broadcastFailure(hex)
            }
          })
        }
        if (config.DEBUG_MODE === true) {
          console.info('Broadcasting Transaction:\n\n' + hex)
        }
      } else {
        console.info('Pretend broadcasting TX:\n\n' + hex)
      }
    }
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





  subscribeAddress (addr) {
    this.endpoint.subscribeAddress (addr)
  }

  unsubscribeAddress (addr) {
    this.endpoint.unsubscribeAddress (addr)
  }

  disconnect () {
    this.endpoint.disconnect()
    this.isDead = true
  }

  getBalance (addr) {
    return this.endpoint.getBalance (addr)
  }

  findCommonTransactions (addr1, addr2) {
    return this.endpoint.findCommonTransactions (addr1, addr2)
  }

  lookupTXID (txid) {
    return this.endpoint.lookupTXID(txid)
  }

  findUTXOsByAddress (address) {
    return this.endpoint.findUTXOsByAddress (address)
  }

  loadTransactionsByAddress (addr, options) {
    this.endpoint.loadTransactionsByAddress (addr, options)
  }





}
