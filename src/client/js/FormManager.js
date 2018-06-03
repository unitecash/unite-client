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
        new Popup()
        .addText('There is a temporary character limit of 217 characters for ')
        .addText('all posts. This will be removed soon.')
        .show()
      }else{
        find_utxo(address.toString()).then((utxo) => {
          if(utxo == -1) {
            var newString = '<h1>ACCOUNT BALANCE</h1>'
            newString += '<p>Check that you\'ve funded your account before posting!</p>'
            newString += '<p>We\'re working on a way to fund new users\' posts, it\'ll be '
            newString += 'out soon!</p><p>In the meantime, here are some ways to fund your account: </p>'
            newString += '<ul><li>Ask a friend to send you some Bitcoin Cash to your Unite address</li>'
            newString += '<li>You can get some from the free.bitcoin.com faucet</li>';
            newString += '<li>You can trade any cryptocurrency for Bitcoin Cash on ShapeShift</li>'
            newString += '<li>You can be tipped on sites like yours.org or Reddit (r/btc)</li>'
            newString += '<li>You can buy some on sites like coinbase.com or kraken.com</li></ul>'
            new Popup(newString).show()
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
            display_success('Your post has been sent!')
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
        new Popup('Your name shouldn\'t be less than 5 or more than 24 characters!').show()
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
        display_alert('[TEMPORARY] There is a temporary character limit of 45 characters for all posts. This will be removed soon!');
      }else{
        find_utxo(address.toString()).then(function(utxo){
          if(utxo == -1){
            var newString = '<h1>ACCOUNT BALANCE</h1>';
            newString += '<p>Check that you\'ve funded your account before posting!</p>';
            newString += '<p>We\'re working on a way to fund new users\' posts, it\'ll be ';
            newString += 'out soon!</p><p>In the meantime, here are some ways to fund your account: </p>';
            newString += '<ul><li>Ask a friend to send you some Bitcoin Cash to your Unite address</li>';
            newString += '<li>You can get some from the free.bitcoin.com faucet</li>';
            newString += '<li>You can trade any cryptocurrency for Bitcoin Cash on ShapeShift</li>';
            newString += '<li>You can be tipped on sites like yours.org or Reddit (r/btc)</li>';
            newString += '<li>You can buy some on sites like coinbase.com or kraken.com</li></ul>';
            display_alert(newString)
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
            console.log(transaction.toString())
            display_success('Your reply has been sent!')
            swooosh()
            $('#newpost').val('')
          }
        })
      }
    })
  }

}
