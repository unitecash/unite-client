/**
 * Post
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * A class for storing data related to the contents of posts
 *
 * @file Provides the Post class
 */

export default class Post {
  constructor (transaction) {
    return new Promise((resolve, reject) => {
      // only construct each post once per page.
      if (typeof window.currentPosts === 'undefined') {
        window.currentPosts = []
      }
      var redundant = false
      for (var i = 0; i < currentPosts.length; i++) {
        if (transaction.txid === currentPosts[i]) {
          if (config.DEBUG_MODE) {
            console.log ('Not constructing existing post redundantly.')
          }
          redundant = true
          resolve (false)
        }
      }
      if (!redundant) {
        currentPosts.push (transaction.txid)
        var sender = transaction.vin[0].addr
        var parent = 'none', code = 'none', data = 'none'
        for (var i = 0; i < transaction.vout.length; i++) {
          if (!transaction.vout[i].scriptPubKey.asm.startsWith('OP_RETURN')) {
            if (parseInt(transaction.vout[i].value * 100000000) <= config.DUST_LIMIT_SIZE &&
    						parseInt(transaction.vout[i].value * 100000000) != 0) {
              // parent is determined by this small, non-zero output
              parent = transaction.vout[i].scriptPubKey.addresses[0]
            }
          } else { // OP_RETURN data parsing
            code = transaction.vout[i].scriptPubKey.asm.substring(10, 14)
            data = transaction.vout[i].scriptPubKey.asm.substring(14)
            data = Utilities.hex2a(data)
          }
        }
        if (parent != 'none' && code != 'none' && data != 'none') {
          this.type = code
          this.sender = sender
          this.parent = parent
          this.txid = transaction.txid
          this.time = transaction.time
          this.data = data
          this.isLive = transaction.isLive
          this.init().then((result) => {
            resolve (result)
          })
        } else {
          resolve (false)
        }
      }
    })
  }

  init () {
    return new Promise((resolve, reject) => {
      NameManager.resolveFromAddress(this.sender).then ((name) => {
        this.senderName = name
        // notifications for live transactions
        if (this.isLive) {
          new AppNotification(post).show()
        }

        // we can also fetch image data, extended messages, parent transactions,
        // number of replies, tips etc in the same way based on tx type

        if (this.type == '5504') {
          NameManager.consider (new Name(this.sender, this.data, this.time))
        } else if (this.type == '5503') {
          this.displayContent = this.data.substr(46) // hacky
        } else if (this.type == '5501') {
          this.displayContent = this.data
        } else if (this.type == '5502') {
          // for this type, the post.data is a magnet link.
          // post.displayContent will be the contents of the torrent.
          // (get it from webtorrent/webseed)
        }
        // if the page supports it and the post contains renderable data,
        // the page-specific onPostLoad function is called.
        if (typeof onPostLoad !== 'undefined' &&
            typeof this.displayContent !== 'undefined') {
          onPostLoad(this)
        }
        resolve(this)
      })
    })
  }

  render (tag) {
    if (typeof this.displayContent === 'undefined') { // only render content.
      return
    }
    if (typeof tag === 'undefined') {
      tag = '#posts'
    }
    var uid = this.txid.substr(0, 16)

    var postDiv = $('<div></div>')
    postDiv.attr('id', uid)
    postDiv.attr('class', 'post')

    var nameText = $('<p></p>')
    nameText.attr('id', uid + 'name')
    nameText.attr('class', 'name')
    nameText.text(this.senderName.displayName)

    var timeText = $('<p></p>')
    timeText.attr('id', uid + 'time')
    timeText.attr('class', 'time')
    timeText.text(this.time)

    var nameHash = $(this.senderName.hash)

    var container = $('<div></div>')
    container.append(nameText)
    container.append(nameHash)
    container.append(timeText)

    var postText = $('<div></div>')
    postText.attr('id', uid + 'content')
    postText.attr('class', 'postText')
    postText.text(this.displayContent)

    var actionBar = $('<div></div>')
    actionBar.attr('class', 'actionBar')

    var replyButton = $('<p></p>')
    replyButton.attr('id', uid + 'reply')
    replyButton.attr('class', 'UITextButton')
    replyButton.text('reply')

    var viewRepliesButton = $('<p></p>')
    viewRepliesButton.attr('id', uid + 'viewreplies')
    viewRepliesButton.attr('class', uid + 'UITextButton')
    viewRepliesButton.text('show replies')

    var tipButton = $('<p></p>')
    tipButton.attr('id', uid + 'tip')
    tipButton.attr('class', 'UITextButton')
    tipButton.text('tip')

    var reportButton = $('<p></p>')
    reportButton.attr('id', uid + 'report')
    reportButton.attr('class', 'UITextButton')
    reportButton.text('report')

    actionBar.append(replyButton)
    actionBar.append(viewRepliesButton)
    actionBar.append(tipButton)
    actionBar.append(reportButton)

    postDiv.append(postText)
    postDiv.prepend(container)
    postDiv.append(actionBar)

    if (this.isLive) {
      $(tag).prepend(postDiv)
    } else {
      $(tag).append(postDiv)
    }

    var newString = '<div id="' + uid + 'tipwindow" class="UIAlertWindow hidden">'
    newString += '<h1>SEND A TIP</h1>'
    newString += '<p>Show how much you appreciate ' + this.senderName.nameText + '\'s post by sending a tip!</p>'
    newString += '<form id="' + uid + 'tipform">'
    newString += '<input type="text" id="' + uid + 'tipamount" class="UITextField center w90"'
    newString += 'placeholder="Amount (satoshis)" /><br/>'
    newString += '<input type="submit" class="UIButton center w90" value="SEND" />'
    newString += '</form></div>'
    $('body').append($(newString))
    $('#' + uid + 'name').on('click', function () {
      window.location.href = 'user.html?address=' + this.sender
    })
    $('#' + uid + 'viewreply').on('click', function () {
      window.location.href = 'post.html?post=' + this.txid
    })
    $('#' + uid + 'tip').on('click', function () {
      display_html_alert('#' + uid + 'tipwindow')
    })
    $('#' + uid + 'tipform').on('submit', function (ev) {
      ev.preventDefault()
      var tipAmount = $('#' + uid + 'tipamount').val()
      document.elementFromPoint(10, 10).click()
      if (this.sender == config.userAddress.toString()) {
        new Popup('<h1>NARCISSISM?</h1><p>You just tried to tip yourself. You failed. Miserably.</p>').show()
      } else {
        find_utxo(address.toString(), tipAmount).then(function (utxo) {
          if (utxo == -1) {
            var newString = '<h1>ACCOUNT BALANCE</h1>'
            newString += '<p>Check that you\'ve funded your account before posting!</p>'
            newString += '<p>We\'re working on a way to fund new users\' posts, it\'ll be '
            newString += 'out soon!</p><p>In the meantime, here are some ways to fund your account: </p>'
            newString += '<ul><li>Ask a friend to send you some Bitcoin Cash to your Unite address</li>'
            newString += '<li>You can get some from the free.bitcoin.com faucet</li>'
            newString += '<li>You can trade any cryptocurrency for Bitcoin Cash on ShapeShift</li>'
            newString += '<li>You can be tipped on sites like yours.org or Reddit (r/btc)</li>'
            newString += '<li>You can buy some on sites like coinbase.com or kraken.com</li></ul>'
            display_alert(newString)
          } else {
            // create dummy tx to find approximate actual TX size with fee
            transaction = new bch.Transaction()
            transaction.from(utxo)
            transaction.to(address.toString(), utxo.satoshis - tipAmount - 300) // approximate
            transaction.to(post.sender, parseInt(tipAmount))
            transaction.addData(hex2a('5503') + hex2a(post.txid))
            transaction.sign(privateKey)
            var tx_size = parseInt(transaction.toString().length / feeThreshold) // fee threshold
            // recreate transaction with correct fee
            transaction = new bch.Transaction()
            transaction.from(utxo)
            transaction.to(address.toString(), utxo.satoshis - tipAmount - tx_size) // approximate
            transaction.to(post.sender, parseInt(tipAmount))
            transaction.addData(hex2a('5503') + hex2a(post.txid))
            transaction.sign(privateKey)
            console.log(transaction.toString())
            // broadcast_tx(transaction.toString());
            display_success('Your tip has been sent!')
            swooosh()
            $('#' + uid + 'tipamount').val('')
          }
        })
      }
    })
  }

}
