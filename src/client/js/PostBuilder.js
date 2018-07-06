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

  static build (type, content, parentAddress, amount, fee, parentTXID) {
    if (typeof type === 'undefined' ||
        typeof parentAddress === 'undefined') {
      return false
    }

    if (typeof amount === 'undefined') {
      amount = config.DUST_LIMIT_SIZE
    }

    if (typeof fee === 'undefined') {
      fee = config.DEFAULT_FEE_PER_BYTE
    }

    if (typeof content === 'undefined') {
      content = ''
    }

    if (config.DEBUG_MODE) {
      console.info('PostBuilder called with arguments:')
      console.info('Type: ', type)
      console.info('Content:', content)
      console.info('Parent Address:', parentAddress)
      console.info('Amount:', amount)
      console.info('Fee:', fee)
      console.info('Parent TXID:', parentTXID)
    }

    // return an array of UTXOs for this user
    networkManager.findUTXOsByAddress(config.userAddress).then((allUTXOs) => {
      var transaction = new bch.Transaction()
      // pay the parent address the amount provided
      transaction.to(bchaddr.toLegacyAddress(parentAddress), amount)
      // if there is a parent transaction, encode the OP_RETURN data to save
      // as much blockchain space (and cost in fees) as possible
      if (typeof parentTXID === 'undefined') { // if no parent TXID
        if (config.DEBUG_MODE) {
          console.log (
            'PostBuilder.build:',
            'Adding (ascii) data to transaction:',
            Utilities.hex2a(type) + content
          )
        }
        transaction.addData(Utilities.hex2a(type) + content)
      } else { // if there is a parent TXID
        var txData = Utilities.hex2buf(type)
        txData = txData.concat(Utilities.hex2buf(parentTXID))
        txData = txData.concat(Utilities.ascii2buf(content))
        if (config.DEBUG_MODE) {
          console.log (
            'PostBuilder.build:',
            'Adding (buffer) data to transaction:',
            txData
          )
        }
        transaction.addData(new Buffer(txData))
      }

      // add UTXOs to transaction until we reach the required amount
      var success = false
      var totalAdded = 0
      for (var i = 0; i < allUTXOs.length && (success === false); i++) {
        var utxo = {
          txId: allUTXOs[i].txid,
          outputIndex: allUTXOs[i].vout,
          address: bchaddr.toLegacyAddress(allUTXOs[i].address),
          script: allUTXOs[i].scriptPubKey,
          satoshis: allUTXOs[i].satoshis
        }
        transaction.from(utxo)
        totalAdded += allUTXOs[i].satoshis
        if (totalAdded >= amount + (1000 * fee)) { // approximate fee amount
          success = true
        }
      }
      if (success) { // set fee, change address, sign, broadcast
        transaction.change(bchaddr.toLegacyAddress(config.userAddress))
        transaction.feePerKb(parseInt(fee * 512)) // hacky.
        transaction.sign(config.userPrivateKey)
        networkManager.broadcastTransaction(transaction.toString())
      } else {
        Messages.notEnoughFunds()
        return false
      }
    })
  }

}
