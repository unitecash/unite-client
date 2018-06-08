/**
 * Post Builder
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * Constructs posts containing data and publishes them to the network, using
 * WebSeeds to seed large torrent payloads when necessary.
 *
 * @file Defines the PostBuilder class.
 */

export default class PostBuilder {

  static build (type, content, parent, amount, fee) {
    if (typeof type === 'undefined' ||
        typeof content === 'undefined' ||
        typeof parent === 'undefined') {
      return false
    }

    if (typeof amount === 'undefined') {
      amount = config.DUST_LIMIT_SIZE
    }

    if (typeof fee === 'undefined') {
      fee = config.DEFAULT_FEE_PER_BYTE
    }

    networkManager.findUTXOsByAddress(config.userAddress).then((data) => {
      var transaction = new bch.Transaction()
      transaction.to(bchaddr.toLegacyAddress(parent), amount)
      transaction.addData(Utilities.hex2a(type) + content)
      var success = false
      var totalAdded = 0
      var utxo_arr = []
      for (var i = 0; i < data.length; i++) {
        var utxo = {
          txId: data[i].txid,
          outputIndex: data[i].vout,
          address: bchaddr.toLegacyAddress(data[i].address),
          script: data[i].scriptPubKey,
          satoshis: data[i].satoshis
        }
        transaction.from(utxo)
        utxo_arr.push(utxo)
        totalAdded += data[i].satoshis
        if (totalAdded >= amount + (768 * fee)) { // approximate
          success = true
          if (totalAdded - amount - (768 * fee) >= config.DUST_LIMIT_SIZE) {
            transaction.to(
              bchaddr.toLegacyAddress(config.userAddress),
              Math.floor(totalAdded - amount - (768 * fee))
            )
          }
          transaction.sign(config.userPrivateKey)
          var txSize = transaction.toString().length / 2
          var transaction = new bch.Transaction()
          transaction.to(bchaddr.toLegacyAddress(parent), amount)
          transaction.addData(Utilities.hex2a(type) + content)
          for (var i = 0; i < utxo_arr.length; i++) {
            transaction.from(utxo_arr[i])
          }
          if (totalAdded - amount - (768 * fee) >= config.DUST_LIMIT_SIZE) {
            transaction.to(
              bchaddr.toLegacyAddress(config.userAddress),
              Math.floor(totalAdded - amount - (txSize * fee))
            )
          }
          transaction.sign(config.userPrivateKey)
          networkManager.broadcastTransaction(transaction.toString())
          i = data.length + 1 // to stop the loop from executing
          break
        }
      }
      if (!success) {
        return false
      }
    })
  }

}
