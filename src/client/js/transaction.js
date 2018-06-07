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
          new Post (transactions[i]).then((result) => {
            resolve (result)
          })
        }
      }
      if (!success) { // look it up from the network and add it to cache
        networkManager.lookupTXID(txid).then((transaction) => {
          if (TransactionManager.validate (transaction)) {
            TransactionManager.remember(transaction)
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

// returns a UTXO suitable for spending given an address
// returns -1 if none are found (insufficient funds)
/* TODO:
- Return multiple small UTXOs if a large one is not found.
- Accept a bitcoincash.js transaction as a parameter, append the relevant UTXOs,
  then return the modified bitcoincash.js "bch.Transaction" object instead of
  just the UTXO.
- Rename the function from find_utxo(address string) to add_utxos(bch.Transaction)
*/
// move to User class
var find_utxo = function (address, amount = 1000) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: 'GET',
      url: insightBaseURL + 'addr/' + address.toString() + '/utxo',
      success: function (data) {
        var utxo = -1
        for (var i = 0; i < data.length; i++) {
          if (data[i].satoshis > amount) { // TODO other checks, precision
            utxo = {
              txId: data[i].txid,
              outputIndex: data[i].vout,
              address: data[i].address,
              script: data[i].scriptPubKey,
              satoshis: data[i].satoshis
            }
            resolve(utxo)
            i = data.length + 1 // stop loop
          }
        }
        resolve(utxo)
      }
    })
  })
}
