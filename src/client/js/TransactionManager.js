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

  // Transaction validation function.
  // Effectively, this dictates what is or is not considered a valid post.
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
    if(!transaction.vout ||
        !transaction.vout.length ||
        !transaction.vin ||
        !transaction.vin.length ||
        !transaction.txid ||
        !transaction.time){
      if(config.DEBUG_MODE){
        console.log(
          'TransactionManager.validate:',
          'transaction is missing essential data, failing:',
          transaction
        )
      }
      return false
    }

    // create an object for storing interpreted data
    // The reason for this is to only store essential data in cache later.
    // this is much smaller than just storing the whole transaction object.
    // at a later time, we should consider just storing an array of indexed
    // values because it is more compact than JSON.
    // This would be similar to how C++ data structures are stored in memory.
    // Also, hex data should be converted to ASCII to save space as both TXIDs and RETURN
    // data are currently stored as hex.
    var result = {
      data: '',
      code: 'none',
      parent: 'none',
      sender: 'none',
      time: transaction.time,
      txid: transaction.txid
    }

    // we first determine the sending address
    for(var i = 0; i < transaction.vin.length; i++) {
      if (result.sender === 'none') {
        result.sender = Utilities.toAddress(transaction.vin[i].addr)
      } else {
        if (result.sender !== Utilities.toAddress(transaction.vin[i].addr)){
          if (config.DEBUG_MODE) {
            console.log(
              'TransactionManager.validate:',
              'Multiple senders:',
              transaction
            )
          }
          return false
        }
      }
    }
    // if no sender, return error
    if (result.sender === 'none') {
      if (config.DEBUG_MODE) {
        console.log(
          'TransactionManager.validate:',
          'No sender:',
          transaction
        )
      }
      return false
    }

    // parse data from the transaction outputs
    for (var i = 0; i < transaction.vout.length; i++) {

      // Parses data from a non-OP_RETURN output
      if (!transaction.vout[i].scriptPubKey.hex.startsWith('6a')) {

        // Finds parent output of transaction. It's hacky, so just trust me
        var candidate = Utilities.toAddress(
          transaction.vout[i].scriptPubKey.addresses[0]
        )
        if (result.parent === 'none') { // this is the first vout
          result.parent = candidate
        } else { // this is not the first vout
          // if sender not parent and parent not candidate then too many parents
          // because parent not 'none'.
          if (result.sender !== result.parent &&
              result.parent !== candidate &&
              result.sender !== candidate) {
            if (config.DEBUG_MODE) {
              console.log(
                'TransactionManager.validate:',
                'Multiple parents:',
                transaction
              )
            }
            return false
          }
          // if sender is parent but parent not vout then make parent vout
          // because if there is a parent that is not sender then the old
          // "parent" was actually just a change output back to sender and
          // the actual parent was different.
          if (result.sender === result.parent &&
              result.parent !== candidate) {
            result.parent = candidate
          }
        }

      } else { // extracts data from OP_RETURN.
        result.code = transaction.vout[i].scriptPubKey.hex.substring(4, 8)
        result.data = transaction.vout[i].scriptPubKey.hex.substring(8)
      }
    }
    if (result.code.startsWith('55') && result.parent !== 'none') {
      return result
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
