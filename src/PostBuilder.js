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

  static build (params) {
    if (typeof params.type === 'undefined' ||
        typeof params.parentAddress === 'undefined') {
      return false
    }

    if (typeof params.amount === 'undefined') {
      params.amount = window.config.DUST_LIMIT_SIZE
    }

    if (typeof params.fee === 'undefined') {
      params.fee = window.config.DEFAULT_FEE_PER_BYTE
    }

    if (typeof params.content === 'undefined') {
      params.content = ''
    }


    log('builder', 'PostBuilder called with arguments:')
    log('builder', 'Type:           ', params.type)
    log('builder', 'Content:        ', params.content)
    log('builder', 'Parent Address: ', params.parentAddress)
    log('builder', 'Amount:         ', params.amount)
    log('builder', 'Fee:            ', params.fee)
    log('builder', 'Parent TXID:    ', params.parentTXID)

    // if the params.content needs to be uploaded to IPFS, do it here.
    if (typeof params.content === 'object') {
      var hashDescriptor = {}
      if (typeof params.content.files !== 'undefined'
          && typeof params.content.files[0] !== 'undefined') {
        // TODO support for multiple files, or at least for auto-zipping.
        var file = params.content.files[0]
        // determine contentType for IPFS hash descriptor
        if (file.type.startsWith('image')) {
          hashDescriptor.contentType = 'image'
        } else if (file.type.startsWith('video')) {
          hashDescriptor.contentType = 'video'
        } else if (file.type.startsWith('audio')) {
          hashDescriptor.contentType = 'audio'
        } else { // ...
            log (
              'builder',
              'PostBuilder.build:',
              'Unable to recognize content type:',
              file.type
            )
          return false
        }
        hashDescriptor.description = params.content.text
        /* long-term TODO:
        Here's where we'd make any conversions and scaledowns, things of that
        nature. We'd add any converted files to window.attachedFiles
        (after converting and/or downscaling them in AWS (publisher pays), or
        locally somehow (really slow)). We then hash each of the files and
        store the hashes in the IPFSHashes array, to be sent to the Unite
        endpoint later.
        */
        window.Utilities.fileToIPFSHash(file).then((hash) => {
          // add the hash to the IPFSHashes array
          // set the hash pointed to by the hash descriptor.
          /*
          In a situation where multiple files are processed and included,
          we would need to add all of them to the hash descriptor.
          */
          hashDescriptor.hash = hash

          // now, we need to make a file from the hash descriptor object
          // we've just constructed, get the hash of it and put the
          // hash descriptor's hash in the blockchain so clients can parse it.
          var hd = new File([JSON.stringify(hashDescriptor)], 'file')

          // we also add the hash descriptor to params so it can be submitted
          // to the endpoint at publication time.
          params.hashDescriptor = hashDescriptor
          log(
            'builder',
            'PostBuilder.build:',
            'Created hash descriptor for multimedia content:',
            hashDescriptor
          )

          // hash the hash descriptor
          window.Utilities.fileToIPFSHash(hd).then((hash) => {
            // add HD's hash to IPFSHashes
            // put HD's hash on the blockchain.
            params.content = hash
            // debug printing prior to constructing.
            log(
              'builder',
              'PostBuilder.build:',
              'constructing multimedia post with parameters:',
              params,
              window.attachedFiles,
            )
            PostBuilder.constructTransaction(
              params,
              window.attachedFiles
            )
          })
        })
      } else { // no files were added, it is just a lot of text.
        hashDescriptor.contentType = 'text'
        hashDescriptor.content = params.content.text
        var hd = new File([JSON.stringify(hashDescriptor)], 'file')
        window.Utilities.fileToIPFSHash(hd).then((hash) => {
          params.content = hash
          PostBuilder.constructTransaction(
            params
          )
        })
      }
    } else {
      PostBuilder.constructTransaction (params)
    }
  }

  // construct the transaction (after parsing content and setting defaults)
  // NOTE: Do not use this outside of PostBuilder.build. Ever. If I knew how,
  // I would make it a private method. It will break unless you provide
  // ALL params perfectly. Do not be lazy and just go update PostBuilder.build.
  static constructTransaction (params, files) {
    // return an array of UTXOs for this user
    networkManager.findUTXOsByAddress(window.config.userAddress).then((allUTXOs) => {
      var transaction = new bch.Transaction()
      // pay the parent address the amount provided
      transaction.to(bchaddr.toLegacyAddress(params.parentAddress), params.amount)
      // if there is a parent transaction, encode the OP_RETURN data to save
      // as much blockchain space (and cost in fees) as possible
      if (typeof params.parentTXID === 'undefined') { // if no parent TXID
        log (
          'builder',
          'PostBuilder.build:',
          'Adding (ascii) data to transaction:',
          window.Utilities.hex2a(params.type) + params.content
        )
        transaction.addData(window.Utilities.hex2a(params.type) + params.content)
      } else { // if there is a parent TXID
        var txData = window.Utilities.hex2buf(params.type)
        txData = txData.concat(window.Utilities.hex2buf(params.parentTXID))
        txData = txData.concat(window.Utilities.ascii2buf(params.content))
        log (
          'builder',
          'PostBuilder.build:',
          'Adding (buffer) data to transaction:',
          txData
        )
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
        if (totalAdded >= params.amount + (1000 * params.fee)) { // approximate fee amount
          success = true
        }
      }
      if (success) { // set fee, change address, sign, broadcast
        transaction.change(bchaddr.toLegacyAddress(window.config.userAddress))
        transaction.feePerKb(parseInt(params.fee * 512)) // hacky.
        transaction.sign(window.config.userPrivateKey)
        networkManager.broadcastTransaction(transaction.toString()).then((result) => {
          if (result === true) {
            if (params.type === '5502' || params.type === '5505') {
              // TODO tell user things are uploading so they don't close window.
              // we should now upload things to the Unite publishing endpoint.
              if (typeof files !== 'undefined') { // Feeble.
                PostBuilder.publishContent(
                  params,
                  files,
                  transaction.toString()
                )
              }
            } else {
              new SuccessBanner('Your post has been sent!').show()
            }
          } // else { the broadcast function shows a broadcast failure message }
        })
      } else {
        Messages.notEnoughFunds()
        return false
      }
    })
  }

  // Publish content to IPFS by uploading it to a Unite endpoint.
  static publishContent (params, files, rawtx, numAttempts) {
    if (typeof numAttempts === 'undefined') {
      numAttempts = 0
    }
    if (numAttempts > 5) {
      cnosole.log(
        'Post.publishContent:',
        'Failed to publish content 5 times. Giving up. Dump:',
        params,
        files,
        rawtx
      )
      // TODO Messages.failedContentPublication(params, files, rawtx, numAttempts)
    }

    // create a form data object and add the relevant objects to it for upload
    var fdata = new FormData()
    fdata.append('signedTransaction', rawtx)
    fdata.append('hashDescriptor', JSON.stringify(params.hashDescriptor))
    for (var i = 0; i < files.length; i++) {
      fdata.append('files', files[i], files[i].name)
    }
    // set the random URL:
    var randomURL = window.Utilities.getRandomFromArray(window.config.uniteEndpoints)
    log(
      'builder',
      'Post.pulishConten:',
      'Selected Unite content publishing endpoint, sending request:',
      randomURL + 'publish'
    )
    // make the ajax request
    $.ajax({
      type: 'POST',
      url: randomURL + 'publish',
      cache: false,
      dataType: 'json',
      processData: false,
      contentType: false,
      data: fdata,
      success: (data) => {
        console.log('Success', data)
        new SuccessBanner('Your post has been sent!').show()
      },
      error: (data) => {
        console.error(
          'PostBuilder.publishContent:',
          'Server returned an error:',
          data
        )
        // TODO a WAY WAY better solution than this vague error message.
        /* "I still have to pay even though it didn't work?!!?1!eleven!1!?1!" */
        new ErrorBanner('Couldn\'t publish post, retrying...').show()
        // just call it again with a numberOfAttempts parameter
        //PostBuilder.publishContent(params, files, rawtx, numAttempts + 1)
      }
    })
  }

}
