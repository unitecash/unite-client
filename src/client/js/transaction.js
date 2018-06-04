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
  constructor (txid) {
    return new Promise ((resolve, reject) => {
      // check if it exists in the DB already
      var transactions = JSON.parse (localStorage.transactions)
      var success = false
      for (var i = 0; i < transactions.length && !success; i++) {
        if (transactions[i].txid == txid && !success) {
          success = true
          new Post (transactions[i])
          resolve (transactions[i])
          return
        }
      }
      if (!success) { // look it up from the network and add it to cache
        $.ajax({
          type: 'GET',
          url: config.randomInsightEndpoint () + 'tx/' + txid,
          success: (transaction) => {
            if (TransactionManager.validate (transaction)) {
              TransactionManager.remember(transaction)
              new Post(transaction)
              resolve (transaction)
            } else {
              resolve (-1)
            }
          }
        })
      }
    })
  }
}


// takes a transaction as input and returns a post after adding the post to posts cache
/* PARAMS:
- isLive: a boolean indicating if the transaction came in over WebSocket (true),
  or not (false).
*/
// actually the constructor for Post objects
var parse_tx = function (input, isLive) {
  return new Promise(function (resolve, reject) {
    var time = input.time
    var tx_from_addr = input.vin[0].addr
    var parent = 'none', code = 'none', data = 'none'
    for (var i = 0; i < input.vout.length; i++) { // for each output
      if (!input.vout[i].scriptPubKey.asm.startsWith('OP_RETURN')) {
        if (parseInt(input.vout[i].value * 100000000) <= dustLimitSize &&
						parseInt(input.vout[i].value * 100000000) != 0) { // this is the parent reference output
          parent = input.vout[i].scriptPubKey.addresses[0]
        }
      } else { // OP_RETURN data parsing
        code = input.vout[i].scriptPubKey.asm.substring(10, 14)
        data = input.vout[i].scriptPubKey.asm.substring(14, input.length)
        data = hex2a(data)
      }
    }
    if (parent != 'none' && code != 'none' && data != 'none') {
      var post = {
        type: code,
        sender: tx_from_addr,
        parent: parent,
        txid: input.txid,
        time: time,
        data: data,
        isLive: isLive
      }
      init_post(post).then(function (updated_post) {
        add_post_to_db(updated_post)
        resolve(updated_post)
      })
    } else {
      resolve(-1)
    }
  })
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
