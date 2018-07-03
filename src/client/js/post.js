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
            console.log (
              'Post.constructor:',
              'Not constructing existing post redundantly.'
            )
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
            if (transaction.vout[i].scriptPubKey.addresses[0] !== config.userAddress &&
      					parseInt(transaction.vout[i].value * 100000000) != 0) {
              // parent is determined by this small, non-zero output
              parent = transaction.vout[i].scriptPubKey.addresses[0]
            }
          } else { // OP_RETURN data parsing
            code = transaction.vout[i].scriptPubKey.asm.substring(10, 14)
            data = transaction.vout[i].scriptPubKey.asm.substring(14)
            //data = Utilities.hex2a(data)
          }
        }
        if (parent != 'none' && code != 'none' && data != 'none') {
          this.type = code
          this.sender = Utilities.stripAddressPrefix(sender)
          this.parent = Utilities.stripAddressPrefix(parent)
          this.txid = transaction.txid
          this.time = transaction.time
          this.data = data
          this.options = transaction.options
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
        // TODO check if the reply is a child of an already-rendered post,
        // setting replyIndex and renderPosition as necessary

        if (this.type == '5504') {
          NameManager.consider ( new Name (
            this.sender, Utilities.hex2a(this.data), this.time
          ))
        } else if (this.type == '5503') {
          this.parentTXID = this.data.substr(0, 64)
          this.displayContent = Utilities.hex2a(this.data.substr(64))
        } else if (this.type == '5501') {
          this.displayContent = Utilities.hex2a(this.data)
        } else if (this.type == '5502') {
          //networkManager.resolveHash(this.data).then((data) => {
          //  this.resolvedData = data
          //  ...
          //})
        }

        // Parse the transaction.options object
        if (typeof this.options === 'undefined') {
          this.options = {}
        }
        if (typeof this.options.isLive === 'undefined') {
          this.options.isLive = false
        }
        if (typeof this.options.UIReplyIndent === 'undefined') {
          /* If this post is live, check if it is the child of any other
           * post currently on the page. If so, set indent to be under
           * the post.
           */
          if (this.options.isLive == 1) {
            // TODO traverse the document for a parent, updating UIReplyIndent
            this.options.UIReplyIndent = 0
          } else {
            this.options.UIDisplayIndent = 0
          }
        }

        // Notifications for live transactions
        if (this.options.isLive) {
          new AppNotification (this).show()
        }

        /*
         * if the page supports it and the post contains renderable data,
         * the page-specific onPostLoad function is called.
         *
         * Note that for DHT/torrent-based content, dispayContent will remain
         * undefined until the retrieval process is complete, at which
         * time the onPostLoad function is called from within that promise.
         */
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
    nameText.attr('class', 'name UITextButton')
    nameText.text(this.senderName.displayName)
    $(document).on('click', '#' + uid + 'name', () => {
      Utilities.redirect('./profile.html?addr=' + this.sender)
    })


    var timeText = $('<p></p>')
    timeText.attr('id', uid + 'time')
    timeText.attr('class', 'time')
    timeText.text(this.time)

    var nameHash = $('<img></img>')
    nameHash.attr('src', this.senderName.calcHash())
    nameHash.attr('alt', 'Address: ' + this.sender)
    nameHash.attr('title', 'Address: ' + this.sender)
    nameHash.attr('id', uid + 'namehash')
    nameHash.attr('class', 'UIPostNameHash UITextButton')
    $(document).on('click', '#' + uid + 'namehash', () => {
      Utilities.redirect('./profile.html?addr=' + this.sender)
    })

    var postHeader = $('<div></div>')
    postHeader.append(nameHash)
    postHeader.append(nameText)
    postHeader.append(timeText)

    var postText = $('<div></div>')
    postText.attr('id', uid + 'content')
    postText.attr('class', 'postText')
    postText.text(this.displayContent) // .html, TODO XSS protection

    var actionBar = $('<div></div>')
    actionBar.attr('class', 'actionBar')

    var replyButton = $('<p></p>')
    replyButton.attr('id', uid + 'reply')
    replyButton.attr('class', 'UITextButton')
    replyButton.text('reply')
    $(document).on('click', '#' + uid + 'reply', () => {
      new CompositionWindow(this)
    })

    var viewRepliesButton = $('<p></p>')
    viewRepliesButton.attr('id', uid + 'viewreplies')
    viewRepliesButton.attr('class', 'UITextButton')
    viewRepliesButton.text('show replies')
    $(document).on('click', '#' + uid + 'viewreplies', () => {
      Utilities.redirect('post.html?txid=' + this.txid)
    })

    var tipButton = $('<p></p>')
    tipButton.attr('id', uid + 'tip')
    tipButton.attr('class', 'UITextButton')
    tipButton.text('tip')
    $(document).on('click', '#' + uid + 'tip', () => {
      new TipWindow (this)
    })

    var reportButton = $('<p></p>')
    reportButton.attr('id', uid + 'report')
    reportButton.attr('class', 'UITextButton')
    reportButton.text('report')
    $(document).on('click', '#' + uid + 'report', () => {
      new ReportWindow (this)
    })

    actionBar.append(replyButton)
    actionBar.append(viewRepliesButton)
    actionBar.append(tipButton)
    actionBar.append(reportButton)

    postDiv.append(postText)
    postDiv.prepend(postHeader)
    postDiv.append(actionBar)

    if (this.options.isLive) { // TODO optional threading of posts
      $(tag).prepend(postDiv)
    } else {
      $(tag).append(postDiv)
    }
  }

  loadReplies () {
    TransactionManager.loadTransactionsByAddress(this.sender)
  }

}
