/**
 * Transaction
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * A class for storing transaction data
 *
 * @file Provides the Transaction class
 */

// takes a transaction as input and returns a post after adding the post to posts cache
/* PARAMS:
- isLive: a boolean indicating if the transaction came in over WebSocket (true),
  or not (false).
*/
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

// Returns an array of Unite transactions by address, adding them to cache
/* TODO:
- A better way of handling multiple pages of transactions than just requesting
  the first 1000 from insight
*/
var get_transactions = function (addr) {
  return new Promise(function (resolve, reject) {
    var tx_arr = []
    $.ajax({
      type: 'GET',
      url: insightBaseURL + 'addr/' + addr + '?from=0&to=1000', // TODO a better solution than a hard limit
      success: function (data) {
        for (var i = 0; i < data.transactions.length; i++) { // for each transaction
          get_tx(data.transactions[i]).then(function (tx) {
            tx_arr.push(tx)
          })
        }
        resolve(tx_arr)
      }
    })
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

// Sends a raw hex bitcoin transaction over the live network
var broadcast_tx = function (tx) {
  if (debug) {
    console.log('pretend broadcasting transaction (debug):\n\n' + tx + '\n\n')
  } else {
    $.ajax({
      type: 'POST',
      url: insightBaseURL + 'tx/send',
      data: {rawtx: tx},
      success: function (data) {
        console.log('TX broadcast successful.\nTX:\n\n' + tx + '\n\ntxid:\n\n: ' + data.txid + '\n\n')
      },
      error: function (data) {
        Messages.broadcastFailure(tx)
      }
    })
  }
}

// Adds transaction to localStorage transactions cache, if it is not already there
var add_tx_to_db = function (tx) {
  // get the tx db
  var transactions = JSON.parse(localStorage.transactions)
  // check if it exists
  for (var i = 0; i < transactions.length; i++) {
    if (transactions[i].txid == tx.txid) {
      if (debug) {
        console.log('Not adding transaction, it is a duplicate.')
      }
      return
    }
  }
  transactions.push(tx)
  localStorage.transactions = JSON.stringify(transactions)
}

// Returns a transaction given a TXID. first searches the cache, then the network
var get_tx = function (txid) {
  return new Promise(function (resolve, reject) {
    // check if it exists in the DB already
    var transactions = JSON.parse(localStorage.transactions)
    var success = false
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].txid == txid) {
        success = true
        resolve(transactions[i])
        return
      }
    }
    if (!success) { // now we look it up on the network and then add it to DB.
      $.ajax({
        type: 'GET',
        url: insightBaseURL + 'tx/' + txid,
        success: function (transaction) {
          if (is_univo_tx(transaction)) {
            add_tx_to_db(transaction)
            resolve(transaction)
          } else {
            resolve(-1)
          }
        }
      })
    }
  })
}

// Determines if the given transaction is a Unite transaction
var is_univo_tx = function (transaction) {
  var parent = 'none', code = 'none'
  for (var i = 0; i < transaction.vout.length; i++) { // for each output
    if (!transaction.vout[i].scriptPubKey.asm.startsWith('OP_RETURN')) {
      if (parseInt(transaction.vout[i].value * 100000000) <= dustLimitSize &&
					parseInt(transaction.vout[i].value * 100000000) != 0) { // this is the parent reference output
        parent = transaction.vout[i].scriptPubKey.addresses[0]
      }
    } else { // OP_RETURN data parsing
      code = transaction.vout[i].scriptPubKey.asm.substring(10, 14)
    }
  }
  if (code.startsWith('55') && parent != 'none') {
    return true
  } else {
    return false
  }
}
