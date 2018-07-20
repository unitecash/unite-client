/**
 * Network Endpoint
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * Provides a class for storing data related to network endpoints and for
 * naviating the neuances of eachendpoint (differing address formats, etc.)
 *
 * @file Defines structures to hold network endpoint data
 */

export default class NetworkEndpoint {
  constructor(args) {
    if (typeof args === 'undefined') {
      return false
    }
    if (typeof args.insightURL === 'undefined') {
      return false
    } else {
      this.insightURL = args.insightURL
    }
    // set defaults for other parameters if not provided
    if (typeof args.websocketURL === 'undefined') {
      this.websocketsSupported = false
    } else {
      this.websocketsSupported = true
      this.websocketURL = args.websocketURL
    }
    if (typeof args.addressFormat === 'undefined') {
      this.addressFormat = 'cashaddress'
    } else {
      this.addressFormat = args.addressFormat
    }
    if (args.disabled === true) {
      this.isDisabled = true
    } else {
      this.isDisabled = false
    }
    this.totalFailures = 0
    this.totalSuccesses = 0
    this.reliability = 1 // TODO reliability=successes/(success+failures) ???
    this.uid = Utilities.getRandomChars(16)
    return new Promise ((resolve, reject) => {
      // verify insightURL and websocketURL
      // TODO we only should verify if it has never been used before.
      // TODO endpoint huristics (success, failures, reliability) should
      // persist to localStorage. In the future, random endpoint selection
      // should be weighted by how reliable each endpoint is.
      // TODO the UID should be the hash of insightURL (first 16)
      $.ajax({
        type: 'GET',
        url: this.insightURL + 'status?q=getInfo',
        success: (data) => {
          if (this.websocketsSupported === true && config.ENABLE_WEBSOCKETS) {
            this.socket = io(this.websocketURL)
            this.socket.on('connect', () => {
              resolve (this)
            })
            this.socket.on('error', () => {
              console.error(
                'NetworkEndpoint.constructor:',
                this.uid + ':',
                'Failed to connect to websocketURL:',
                this.websocketURL,
                'Disabling websocket.'
              )
              this.websocketsSupported = false
              this.socket.disconnect()
              resolve (this)
            })
            this.socket.on('connect_failed', () => {
              console.error(
                'NetworkEndpoint.constructor:',
                this.uid + ':',
                'Failed to connect to websocketURL:',
                this.websocketURL,
                'Disabling websocket.'
              )
              this.websocketsSupported = false
              this.socket.disconnect()
              resolve (this)
            })
            this.socket.on('connect_error', () => {
              console.error(
                'NetworkEndpoint.constructor:',
                this.uid + ':',
                'Failed to connect to websocketURL:',
                this.websocketURL,
                'Disabling websocket.'
              )
              this.websocketsSupported = false
              this.socket.disconnect()
              resolve (this)
            })
          } else {
            resolve (this)
          }
        },
        error: () => {
          console.error(
            'NetworkEndpoint.constructor:',
            this.uid + ':',
            'Failed to connect to insightURL:',
            this.insightURL
          )
          this.isDisabled = true
          resolve (false)
          return false
        }
      })
    })
  }

  bindEvents () {
    this.socket.on('tx', (data) => {
      new Transaction(data.txid, {
        isLive: true
      })
    })
  }

  subscribeAddress (addr) {
    this.socket.emit('subscribe', addr)
  }

  unsubscribeAddress (addr) {
    this.socket.emit('unsubscribe', addr)
  }

  disconnect () {
    this.isDisabled = true
    this.socket.disconnect()
  }

  getBalance (addr) {
    return new Promise ((resolve, reject) => {
      if (!this.isDisabled) {
        $.ajax({
          type: 'GET',
          url: this.insightURL + 'addr/' + addr,
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
      if (!this.isDisabled) {
        $.ajax({
          type: 'GET',
          url: this.insightURL + 'addr/' + addr1 + '?from=0&to=1000',
          success: (data1) => {
            $.ajax({
              type: 'GET',
              url: this.insightURL + 'addr/' + addr2 + '?from=0&to=1000',
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
      if (!this.isDisabled) {
        $.ajax({
          type: 'GET',
          url: this.insightURL + 'tx/' + txid,
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
      if (!this.isDisabled) {
        $.ajax({
          type: 'GET',
          url: this.insightURL + 'addr/' + address + '/utxo',
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

  loadTransactionsByAddress (addr, options) {
    if (typeof options === 'undefined') {
      options = {}
    }
    return new Promise((resolve, reject) => {
      if (!this.isDisabled) {
        $.ajax({
          type: 'GET',
          url: this.insightURL + 'addr/' + addr + '?from=0&to=1000', // TODO a better solution than a hard limit
          success: (data) => {
            for (var i = 0; i < data.transactions.length; i++) { // for each transaction
              new Transaction(data.transactions[i], options)
            }
            resolve (true)
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

}
