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

          // At this point in time the network should be ready for use.
          resolve (this)

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
              // connect to the IPFS peers
              /* Disabled because the code is obsolete and this functionality
              is now accomplished with the Unite endpoint.
              for (var i = 0; i < config.IPFSEndpoints.length; i++){
                this.IPFSNode.swarm.connect(config.IPFSEndpoints[i])
              }*/
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
    return new Promise ((resolve, reject) => {
      if (!this.isDead) {
        if (config.ENABLE_TRANSACTION_BROADCASTS === true) {
          for (var i = 0; i < config.networkEndpoints.length; i++) {
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
          resolve (true) // TODO resolve true only after all ajax calls complete.
          if (config.DEBUG_MODE === true) {
            console.info('Broadcasting Transaction:\n\n' + hex)
          }
        } else {
          console.info('Pretend broadcasting TX:\n\n' + hex)
          resolve (true) // true, because no error has occurred.
        }
      } else {
        resolve (false) // false, because networkManager is dead.
      }
    })
  }

  // Adds a file to IPFS with the data provided, notifying pin-servers who will
  // then pin the content for reliable access.
  /* Disabled because this is now accomplished with the Unite endpoint.
  Ideally, client-side, fully-decentralized publishing would exist but it has
  not been done yet. If anybody would like to work on this please do so.
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
  }*/

  // Retrieves a file's contents from IPFS
  retrieveFromIPFS (hash) {
    return new Promise ((resolve, reject) => {
      if (!this.isDead) {
        var xhr = $.ajax({
          type: 'GET',
          url: Utilities.getRandomFromArray(config.IPFSEndpoints) + hash,
          success: (data) => {
            resolve (data)
          },
          error: (data) => {
            if (config.DEBUG_MODE) {
              console.error (
                'NetworkManager.retrieveFromIPFS:',
                'Failed to resolve IPFS hash:',
                hash,
                'due to error:',
                data
              )
            }
            resolve (false)
          },
          xhrFields: {
            onprogress: function(progress) {
              if (progress.loaded > config.MAX_HASH_DESCRIPTOR_SIZE) {
                // stop any unreasonably long malicious payload downloads.
                /*if (config.DEBUG_MODE) {
                  console.error(
                    'NetworkManager.resolveFromIPFS:',
                    'Not resolving hash descriptor above',
                    config.MAX_HASH_DESCRIPTOR_SIZE,
                    'bytes.'
                  )
                }*/
                xhr.abort()
              }
            }
          }
        })
      } else {
        resolve (false)
      }
    })
  }

  // finds the type of hash or URL and resolves the associated data
  // TODO add better way of recognizing IPFS hashes.
  // TODO look into Torrents, HTTP, other IPFS "multihash", other DHTs, Tor etc.
  resolveHash(hash) {
    /*if (config.DEBUG_MODE) {
      console.log(
        'networkManager.resolveHash:',
        'Attempting to resolve:',
        hash
      )
    }*/
    return new Promise ((resolve, reject) => {
      if (hash.length === 46 && hash.startsWith('Q')) { // IPFS
        this.retrieveFromIPFS(hash).then((data) => {
          resolve (data)
        })
      } else {
        if (config.DEBUG_MODE) {
          console.log(
            'networkManager.resolveHash:',
            'Could not recognize the hash type of hash:',
            hash
          )
          resolve (false)
        }
      }
    })
  }

  // Subscribe to live websocket notifications for given address from Insight.
  subscribeAddress (addr) {
    this.endpoint.subscribeAddress (addr)
  }

 // Unubscribe from live websocket notifications for given address from Insight.
  unsubscribeAddress (addr) {
    this.endpoint.unsubscribeAddress (addr)
  }

  // die. Used to stop floods when the code malfunctions and for debugging.
  disconnect () {
    this.endpoint.disconnect()
    this.isDead = true
  }

  // The below methods provide interfaces to the network endpoint.

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
