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
          return false
        }
      }

      if (!redundant) {
        // now we know it isn't redundant we mark post as "loaded on this page"
        currentPosts.push (transaction.txid)

        // parse the options passed in by "new Transaction" and add defaults
        // Parse the transaction.options object
        this.options = transaction.options
        if (typeof this.options === 'undefined') {
          this.options = {}
        }
        if (typeof this.options.isLive === 'undefined') {
          this.options.isLive = false
        }
        if (typeof this.options.UIReplyIndent === 'undefined') {
          this.options.UIReplyIndent = 0
        }
        if (this.options.UIReplyIndent > 4) {
          // relative to the top post on this page, this post is too far
          // nested in the thread to be loaded
          if (config.DEBUG_MODE) {
            console.log (
              'Post.constructor:',
              'Relative to top post, this post has reply indent of',
              this.options.UIReplyIndent,
              'which is greater than the limit of 4. Killing post.'
            )
          }
          resolve (false)
          return false
        }

        // initialize, extract, parse and determine the values for attributes
        var sender = transaction.vin[0].addr
        var parent = 'none', code = 'none', data = 'none'
        for (var i = 0; i < transaction.vout.length; i++) {
          if (!transaction.vout[i].scriptPubKey.asm.startsWith('OP_RETURN')) {
            // POTENTIAL BUG: should this be this.sender or config.userAddress?
            if (transaction.vout[i].scriptPubKey.addresses[0] !== config.userAddress &&
      					parseInt(transaction.vout[i].value * 100000000) != 0) {
              // parent is determined by non-zero output not equal to sender
              parent = transaction.vout[i].scriptPubKey.addresses[0]
            }
          } else { // OP_RETURN data parsing
            code = transaction.vout[i].scriptPubKey.asm.substring(10, 14)
            data = transaction.vout[i].scriptPubKey.asm.substring(14)
          }
        }
        // if the attributes were successfully set, continue.
        if (parent != 'none' && code != 'none' && data != 'none') {
          this.type = code
          this.sender = Utilities.stripAddressPrefix(sender)
          this.parent = Utilities.stripAddressPrefix(parent)
          this.txid = transaction.txid
          this.time = transaction.time
          this.data = data
          this.uid = this.txid.substr(0, 16)
          this.options = transaction.options
          this.displayContent = []
          this.init().then((result) => {
            // this will cause the entire "promise chain" all the way back to
            // the "new Transaction(txid)" to resolve with the fully-initialized
            // and constructed post.
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

        // now that all pre-requisites are met, take the appropriate action
        // based on the type of post we are parsing
        if (this.type === '5504') {
          NameManager.consider ( new Name (
            this.sender, Utilities.hex2a(this.data), this.time
          ))
        } else if (this.type === '5503') {
          this.parentTXID = this.data.substr(0, 64)
          this.displayContent[0] = $('<p></p>')
          this.displayContent[0].text(Utilities.hex2a(this.data.substr(64)))
        } else if (this.type === '5501') {
          this.displayContent[0] = $('<p></p>')
          this.displayContent[0].text(Utilities.hex2a(this.data))
        } else if (this.type === '5502' || this.type === '5505') {
          networkManager.resolveHash(Utilities.hex2a(this.data)).then((data) => {
            // now that the hash has been resolved, try to parse the JSON.
            try {
              if (this.type === '5502') {
                this.resolvedData = JSON.parse(data)
              } else {
                this.parentTXID = this.data.substr(0, 64)
                this.resolvedData = JSON.parse(data.substr(64))
              }
            } catch (e) {
              if (config.DEBUG_MODE) {
                console.error (
                  'Post.init:',
                  this.uid + ':',
                  'Unable to parse JSON from hash descriptor'
                )
              }
              resolve (false)
              return false
            }
            if (this.resolvedData.contentType === 'image') {
              this.displayContent[0] = $('<img></img>')
              this.displayContent[0].attr(
                'src',
                Utilities.getRandomFromArray(config.IPFSEndpoints) + this.resolvedData.hash
              )
              this.displayContent[0].attr(
                'alt',
                this.resolvedData.description
              )
              this.displayContent[0].attr(
                'title',
                this.resolvedData.description
              )
              this.displayContent[0].attr(
                'class',
                'UIDisplayImage'
              )
              this.displayContent[1] = $('<p></p>')
              this.displayContent[1].attr('class', 'UIFootnote')
              this.displayContent[1].text(this.resolvedData.description)
              // pass to host page
              if (typeof onPostLoad !== 'undefined') {
                onPostLoad(this)
              }
            } else if (this.resolvedData.contentType === 'video') {
              this.displayContent[0] = $('<video controls></video>')
              this.displayContent[0].attr(
                'class',
                'UIDisplayVideo'
              )
              var source = $('<source></source>')
              source.attr(
                'src',
                Utilities.getRandomFromArray(config.IPFSEndpoints) + this.resolvedData.hash
              )
              source.attr(
                'type',
                'video/mp4'
              )
              this.displayContent[0].append(source)
              this.displayContent[1] = $('<h2></h2>')
              this.displayContent[1].text(this.resolvedData.title)
              this.displayContent[2] = $('<p></p>')
              this.displayContent[2].text(this.resolvedData.description)
              // pass to host page
              if (typeof onPostLoad !== 'undefined') {
                onPostLoad(this)
              }
            } else { // videos, articles, long paragraphs of text.......


            }
          })
        }

        // Notifications for live (current, from-the-websocket content)
        if (this.options.isLive) {
          new AppNotification (this).show()
        }

        /*
         * if the page supports it and the post contains renderable data,
         * the page-specific onPostLoad function is called*.
         *
         * UNLESS there is un-resolved DHT/Torrent hashes, in which case
         * the render function will be called after hash resolution
         */
        if (typeof onPostLoad !== 'undefined' &&
            typeof this.displayContent !== 'undefined') {
          onPostLoad(this)
        }

        if (config.DEBUG_MODE) {
          /* Disabled because it is annoying.
          console.log (
            'Post.init',
            'Post has made it to end of init:',
            this
          )*/
        }

        // resolve the current state of the post, after everything is done,
        // back to the ORIGINAL function caller "new Transaction(txid, options)"
        resolve(this)
      })
    })
  }

  // NOTE that tag is overridden by parentUID when parentUID is provided via options
  // TODO remove "tag" and just do it from options maybe, or make it standard across pages.
  render (tag) {
    if (typeof this.displayContent[0] === 'undefined') { // only render content.
      return false
    }
    if (typeof tag === 'undefined') {
      tag = '#posts'
    }

    var postDiv = $('<div></div>')
    postDiv.attr('id', this.uid)
    // if there is a UIReplyIndent, add it as a CSS class
    if (this.options.UIReplyIndent > 0) {
      postDiv.attr('class', 'post UIIndent' + this.options.UIReplyIndent)
    } else {
      postDiv.attr('class', 'post')
    }

    var timeText = $('<p></p>')
    timeText.attr('id', this.uid + 'time')
    timeText.attr('class', 'time')
    timeText.text(this.time)

    var postHeader = $('<div></div>')
    postHeader.append(this.senderName.getInlineName())
    postHeader.append(timeText)

    var postText = $('<div></div>')
    postText.attr('id', this.uid + 'content')
    postText.attr('class', 'postText')
    for(var i = 0; i < this.displayContent.length; i++) {
      postText.append(this.displayContent[i])
    }

    var actionBar = $('<div></div>')
    actionBar.attr('class', 'actionBar')

    var replyButton = $('<p></p>')
    replyButton.attr('id', this.uid + 'reply')
    replyButton.attr('class', 'UITextButton')
    replyButton.text('reply')
    $(document).on('click', '#' + this.uid + 'reply', () => {
      new CompositionWindow(this)
    })

    var viewRepliesButton = $('<p></p>')
    viewRepliesButton.attr('id', this.uid + 'viewreplies')
    viewRepliesButton.attr('class', 'UITextButton')
    viewRepliesButton.text('show replies')
    $(document).on('click', '#' + this.uid + 'viewreplies', () => {
      Utilities.redirect('post.html?txid=' + this.txid)
    })

    var tipButton = $('<p></p>')
    tipButton.attr('id', this.uid + 'tip')
    tipButton.attr('class', 'UITextButton')
    tipButton.text('tip')
    $(document).on('click', '#' + this.uid + 'tip', () => {
      new TipWindow (this)
    })

    var reportButton = $('<p></p>')
    reportButton.attr('id', this.uid + 'report')
    reportButton.attr('class', 'UITextButton')
    reportButton.text('report')
    $(document).on('click', '#' + this.uid + 'report', () => {
      new ReportWindow (this)
    })

    if (config.DEBUG_MODE) {
      var debugButton = $('<p></p>')
      debugButton.attr('id', this.uid + 'debug')
      debugButton.attr('class', 'UITextButton')
      debugButton.text('debug')
      $(document).on('click', '#' + this.uid + 'debug', () => {
        console.log(
          'Debug: dumping post: \n',
          this
        )
      })
      actionBar.append(debugButton)
    }

    actionBar.append(replyButton)
    actionBar.append(viewRepliesButton)
    actionBar.append(tipButton)
    actionBar.append(reportButton)

    postDiv.append(postText)
    postDiv.prepend(postHeader)
    postDiv.append(actionBar)

    if (typeof this.options.parentUID === 'undefined') {
      /*if (config.DEBUG_MODE) {
        console.log (
          'Post.render:',
          uid + ':',
          'No parent UID given, rendering based on isLive'
        )
      }*/
      if (this.options.isLive) {
        $(tag).prepend(postDiv)
      } else {
        $(tag).append(postDiv)
      }
    } else { // insert the post at the location of the parent UID
      /*if (config.DEBUG_MODE) {
        console.log (
          'Post.render:',
          uid + ':',
          'ParentUID was defined as ',
          this.options.parentUID,
          ', rendering after parentUID on the page'
        )
      }*/
      $('#' + this.options.parentUID).after(postDiv)
    }

    // now we load all the children (threaded).
    if (this.options.loadChildren === true) {
      if (config.DEBUG_MODE) {
        console.log (
          'post.render',
          this.uid + ':',
          'rendering children with parameters:',
          {
            parentUID: this.uid,
            UIReplyIndent: this.options.UIReplyIndent + 1
          }
        )
      }
      this.loadReplies()
    }
  }

  loadReplies () {
    networkManager.loadTransactionsByAddress(this.sender,
    {
      parentUID: this.uid,
      UIReplyIndent: this.options.UIReplyIndent + 1,
      loadChildren: true
    })
  }

}
