/**
 * Transaction
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * A class for storing transaction data
 *
 * @file Provides the Transaction class
 */

export default class Transaction {
  constructor (txid, isLive) {
    if (typeof isLive === 'undefined') {
      this.isLive = false
    } else {
      this.isLive = isLive
    }
    return new Promise ((resolve, reject) => {
      // check if it exists in the DB already
      var transactions = JSON.parse (localStorage.transactions)
      var success = false
      for (var i = 0; i < transactions.length && !success; i++) {
        if (transactions[i].txid == txid && !success) {
          success = true
          new Post (transactions[i], this.isLive).then((result) => {
            resolve (result)
          })
        }
      }
      if (!success) { // look it up from the network and add it to cache
        networkManager.lookupTXID(txid).then((transaction) => {
          if (TransactionManager.validate (transaction)) {
            TransactionManager.remember(transaction)
            new Post(transaction, this.isLive).then((result) => {
              resolve (result)
            })
          } else {
            resolve (false)
          }
        })
      }
    })
  }
}
