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
  constructor (transaction, isLive) {
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
      if (typeof isLive === 'undefined') {
        isLive = false
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
          this.isLive = isLive
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
          new AppNotification (this).show()
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
    nameText.attr('class', 'name UITextButton')
    nameText.text(this.senderName.displayName)
    $(document).on('click', '#' + uid + 'name', () => {
      Utilities.redirect('user.html?addr=' + this.sender)
    })


    var timeText = $('<p></p>')
    timeText.attr('id', uid + 'time')
    timeText.attr('class', 'time')
    timeText.text(this.time)

    var nameHash = $('<img></img>')
    nameHash.attr('src', this.senderName.hashData)
    nameHash.attr('alt', 'Address: ' + this.sender)
    nameHash.attr('title', 'Address: ' + this.sender)
    nameHash.attr('id', uid + 'namehash')
    nameHash.attr('class', 'UIPostNameHash UITextButton')
    $(document).on('click', '#' + uid + 'namehash', () => {
      Utilities.redirect('user.html?addr=' + this.sender)
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
    $(document).on('click', '#' + uid + 'reply', () => {
      Utilities.redirect('post.html?txid=' + this.txid)
    })

    var tipButton = $('<p></p>')
    tipButton.attr('id', uid + 'tip')
    tipButton.attr('class', 'UITextButton')
    tipButton.text('tip')
    $(document).on('click', '#' + uid + 'tip', () => {
      new TipWindow(this)
    })


    var reportButton = $('<p></p>')
    reportButton.attr('id', uid + 'report')
    reportButton.attr('class', 'UITextButton')
    reportButton.text('report')
    $(document).on('click', '#' + uid + 'report', () => {
      new ReportWindow(this)
    })

    actionBar.append(replyButton)
    actionBar.append(viewRepliesButton)
    actionBar.append(tipButton)
    actionBar.append(reportButton)

    postDiv.append(postText)
    postDiv.prepend(postHeader)
    postDiv.append(actionBar)

    if (this.isLive) { // TODO optional threading of posts
      $(tag).prepend(postDiv)
    } else {
      $(tag).append(postDiv)
    }
  }

}
