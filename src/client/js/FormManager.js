/**
 * Form Manager
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * Management of forms, click actions and other events
 *
 * @file Defines the FormManager class.
 */

export default class FormManager {

  constructor () {
    this.bindEvents()
  }

  bindEvents() {
    this.bindLogout()
    this.bindBackButtons()
    this.bindSendAction()
    this.bindSendReplyAction()
    this.bindNameChangeAction()
  }

  bindLogout () {
    $('#logout').on('click', (ev) => {
      ev.preventDefault()
      Utilities.logOut()
    })
  }

  bindBackButtons () {
    $('#backbutton').on('click', () => {
      history.back()
    })
    $(document).on('keydown', (e) => { // hacky
      if (e.keyCode == 27){
        Utilities.closePopup()
      }
    })
  }

  bindSendAction () {
    $('#sendpost').on('submit', function(ev){
      ev.preventDefault()
      var post_text = $('#newpost').val()
      if(post_text.length < 1 || post_text.length > 217){
        Messages.tempCharLimit(217)
      }else{
        find_utxo(address.toString()).then((utxo) => {
          if(utxo == -1) {
            Messages.notEnoughFunds()
          }else{
            // create dummy tx to find approximate actual TX size with fee
            transaction = new bch.Transaction()
            transaction.from(utxo)
            transaction.to(address.toString(), utxo.satoshis - 768) // approximate
            transaction.to(central_posts_address, dustLimitSize)
            transaction.addData(hex2a('5501')+post_text)
            transaction.sign(privateKey)
            var tx_size = parseInt(transaction.toString().length/feeThreshold) // fee threshold
            // recreate transaction with correct fee
            transaction = new bch.Transaction()
            transaction.from(utxo)
            transaction.to(address.toString(), utxo.satoshis - dustLimitSize - tx_size)
            transaction.to(central_posts_address, dustLimitSize)
            transaction.addData(hex2a('5501')+post_text)
            transaction.sign(privateKey)
            broadcast_tx(transaction.toString())
            new SuccessBanner('Your post has been sent!').show()
            swooosh()
            $('#newpost').val('')
          }
        })
      }
    })
  }

  bindNameChangeAction () {
    $('#namechangesubmit').on('click', function(){
      var name = $('#newName').val();
      if(name.length < 5 || name.length > 24){
        new Popup('Your name should be between 5 and 24 characters.').show()
      }else{
        find_utxo(address.toString()).then(function(utxo){
          // create dummy tx to find approx size with fee
          transaction = new bch.Transaction()
          transaction.from(utxo)
          transaction.to(address.toString(), utxo.satoshis - dustLimitSize - 280) // approximate
          transaction.to(central_profiles_address, dustLimitSize)
          transaction.addData(hex2a('5504')+name)
          transaction.sign(privateKey)
          var tx_size = parseInt(transaction.toString().length/feeThreshold)
          // recreate transaction with correct fee
          transaction = new bch.Transaction()
          transaction.from(utxo)
          transaction.to(address.toString(), utxo.satoshis - dustLimitSize - tx_size)
          transaction.to(central_profiles_address, dustLimitSize)
          transaction.addData(hex2a('5504')+name)
          transaction.sign(privateKey)
          broadcast_tx(transaction.toString())
          display_success('Name updated!')
          $('#newName').val('')
        })
      }
    })
  }

  bindSendReplyAction () {
    $('#sendreply').on('submit', function(ev){
      ev.preventDefault();
      var post_text = $('#newpost').val();
      if(post_text.length < 1 || post_text.length > 45){
        Messages.tempCharLimit()
      }else{
        find_utxo(address.toString()).then(function(utxo){
          if(utxo == -1){
            Messages.notEnoughFunds()
          }else{
            // TODO [IMPORTANT!] verify this is set in the URL
            // create dummy tx to find approximate actual TX size with fee
            transaction = new bch.Transaction()
            transaction.from(utxo)
            transaction.to(address.toString(), utxo.satoshis - dustLimitSize - 300) // approximate
            transaction.to(topPost.sender, dustLimitSize)
            transaction.addData(hex2a('5503')+hex2a(topPost.txid)+post_text)
            transaction.sign(privateKey)
            var tx_size = parseInt(transaction.toString().length/feeThreshold) // fee threshold
            // recreate transaction with correct fee
            transaction = new bch.Transaction()
            transaction.from(utxo)
            transaction.to(address.toString(), utxo.satoshis - dustLimitSize - tx_size) // approximate
            transaction.to(topPost.sender, dustLimitSize)
            transaction.addData(hex2a('5503')+hex2a(topPost.txid)+post_text)
            transaction.sign(privateKey)
            broadcast_tx(transaction.toString())
            new SuccessBanner('Your reply has been sent!').show()
            swooosh()
            $('#newpost').val('')
          }
        })
      }
    })
  }

}
