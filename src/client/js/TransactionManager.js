/**
 * TransactionManager
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * A class for managing, parsing, broadcasting and storing Transaction objects
 *
 * @file Defines the TransactionManager class
 */

export default class TransactionManager {


  static validate (transaction) {
    if (typeof transaction !== 'object') {
      if (config.DEBUG_MODE) {
        console.error(
          'A malformed transaction was passed for validation:',
          transaction
        )
      }
      return false
    }
    var parent = 'none', code = 'none'
    for (var i = 0; i < transaction.vout.length; i++) { // for each output
      if (!transaction.vout[i].scriptPubKey.asm.startsWith('OP_RETURN')) {
        if (transaction.vout[i].scriptPubKey.addresses[0] !== config.userAddress &&
  					parseInt(transaction.vout[i].value * 100000000) != 0) {
          // this finds the parent output of the transaction.
          parent = transaction.vout[i].scriptPubKey.addresses[0]
        }
      } else { // OP_RETURN data parsing
        code = transaction.vout[i].scriptPubKey.asm.substring(10, 14)
      }
    }
    if (code.startsWith('55') && parent != 'none') {
      return true
    }
    return false
  }

  static remember (transaction) {
    var transactions = JSON.parse(localStorage.transactions)
    // check if it exists
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].txid == transaction.txid) {
        if (config.DEBUG_MODE) {
          console.log('Not adding transaction, it is a duplicate.')
        }
        return
      }
    }
    transactions.push(transaction)
    localStorage.transactions = JSON.stringify(transactions)
  }

  static forget (txid) {
    var transactions = JSON.parse(localStorage.transactions)
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].txid == txid) {
        transactions.splice(i, 1)
      }
    }
    localStorage.transactions = JSON.stringify (transactions)
  }

}
