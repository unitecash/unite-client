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
  constructor (txid, options) {
    if (typeof options === 'undefined') {
      options = {}
    }
    return new Promise ((resolve, reject) => {
      // check if it exists in the DB already
      var transactions = JSON.parse (localStorage.transactions)
      var success = false
      for (var i = 0; i < transactions.length && !success; i++) {
        if (transactions[i].txid == txid && !success) {
          success = true
          transactions[i].options = options
          new Post (transactions[i]).then((result) => {
            resolve (result)
          })
        }
      }
      if (!success) { // look it up from the network and add it to cache
        networkManager.lookupTXID(txid).then((transaction) => {
          if (TransactionManager.validate (transaction)) {
            TransactionManager.remember(transaction)
            transaction.options = options
            new Post(transaction).then((result) => {
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
