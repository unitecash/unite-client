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
        log (
          'post',
          'Post.constructor:',
          'Relative to top post, this post has reply indent of',
          this.options.UIReplyIndent,
          'which is greater than the limit of 4. Killing post.'
        )
        resolve (false)
        return false
      }
      // define all the variables
      this.type = transaction.code
      this.sender = Utilities.stripAddressPrefix(transaction.sender)
      this.parent = Utilities.stripAddressPrefix(transaction.parent)
      this.txid = transaction.txid
      this.time = transaction.time
      this.data = transaction.data
      this.uid = this.txid.substr(0, 16)
      this.options = transaction.options
      this.displayContent = []
      // Now we assign some values which are post-type-dependent
      if (this.type === '5504') { // this is a name declaration.
        NameManager.consider ( new Name (
          this.sender, Utilities.hex2a(this.data), this.time
        ))
      } else if (this.type === '5503') { // this is a simple tip/reply.
        this.parentTXID = this.data.substr(0, 64)
        this.displayContent[0] = $('<p></p>')
        this.displayContent[0].text(Utilities.hex2a(this.data.substr(64)))
      } else if (this.type === '5501') { // this is a short text post.
        this.displayContent[0] = $('<p></p>')
        this.displayContent[0].text(Utilities.hex2a(this.data))
      } else if (this.type === '5502' || this.type === '5505') { // multimedia
        this.hash = Utilities.hex2a(this.data)
        if (this.type === '5505') { // multimedia with a parent TXID.
          this.hash = this.hash.substr(32)
          this.parentTXID = this.data.substr(0, 64)
        }
        // we only resolve the IPFS hash to find out more inside of Post.init
        // which is called by the host page if it actually wants to load it.
      }
      // Now we call the page-specific onPostLoad functionn which will decide
      // if execution continues beyond this point.
      if (typeof onPostLoad === 'function') {
        onPostLoad(this).then((result) => {
          resolve(result)
        })
      } else {
        log(
          'post',
          'Post.constructor:',
          'Cannot find the window.onPostLoad() function!'
        )
      }
    })
  }

  // Fetch poster's name and any external data needed to render the post,
  // then call the render function.
  init () {
    return new Promise((resolve, reject) => {
      // only initialize each post once per page.
      // NOTE currentPosts was defined in Config as window.currentPosts
      var isCurrentPostRedundant = false
      for (var i = 0; i < currentPosts.length; i++) {
        if (this.txid === currentPosts[i]) {
          log (
            'post',
            'Post.init:',
            this.uid + ':',
            'Not constructing existing post redundantly.'
          )
          isCurrentPostRedundant = true
          resolve (false)
          return false
        }
      }

      if (isCurrentPostRedundant === false) {
        // now we know it isn't redundant we mark post as "rendered on this page"
        currentPosts.push (this.txid)

        // we can now start the process of loading the post's children, because
        // we've made sure this post is not a duplicate.
        if (this.options.loadChildren === true) {
          this.loadReplies()
        }

        // get the sender's name
        NameManager.resolveFromAddress(this.sender).then ((name) => {
          this.senderName = name

          // for these types, we need to resolve a hash or an HTTP URL.
          if (this.type === '5502' || this.type === '5505') {
            networkManager.resolveHash(this.hash).then((data) => {
              // now that the content descriptor hash has been resolved, try
              // to parse the JSON.
              try {
                this.resolvedData = JSON.parse(data)
              } catch (e) {
                error (
                  'post',
                  'Post.init:',
                  this.uid + ':',
                  'Unable to parse JSON from hash descriptor'
                )
                resolve (false) // malformed JSON from the hash descriptor, die.
                return false
              }

              // Object has been parsed. We can now populate the
              // displayContent array based on what contentType was defined
              // by the content descriptor.
              if (this.resolvedData.contentType === 'image') {
                // TODO a JavaScript class for displaying images (which allows
                // you to tap into it and get it full-screen, pinch-to-zoom...)
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
                var temp = this.displayContent[0]
                this.displayContent[0] = $('<center></center>')
                this.displayContent[0].append(temp)
                this.displayContent[1] = $('<p></p>')
                this.displayContent[1].attr('class', 'UIFootnote')
                this.displayContent[1].text(this.resolvedData.description)
                // pass to host page
                if (typeof onPostLoad !== 'undefined') {
                  onPostLoad(this)
                }
              } else if (this.resolvedData.contentType === 'video') {
                /* TODO:
                  A class for displaying videos, including multi-resolutions,
                  (different resolutions specified as different file hashes in
                  the content descriptor), as well as auto-switching between them
                  based on network lag and latency.

                  This will involve creation of a video player which can manage
                  all of these options. Should be mobile-friendly and auto
                  scaledown (no 4K videos on 480p screens).
                */
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
                var temp = this.displayContent[0]
                this.displayContent[0] = $('<center></center>')
                this.displayContent[0].append(temp)
                this.displayContent[1] = $('<h2></h2>')
                this.displayContent[1].text(this.resolvedData.title)
                this.displayContent[2] = $('<p></p>')
                this.displayContent[2].text(this.resolvedData.description)
                // pass to host page
                if (typeof onPostLoad !== 'undefined') {
                  onPostLoad(this)
                }
              } else {
                /*
                  TODO: Other content types: Some ideas:
                  - News articles (with citations to other TXIDs and a citation
                    system)
                  - Galleries of photos
                  - Vector drawings
                  - encrypted multimedia content (only for a single BCH key to
                    unlock (or a group key)).
                  - Markdown content (a markdown parser and editor)
                */
                log(
                  'post',
                  'Post.init:',
                  this.uid + ':',
                  'Unrecognized multimedia content type:',
                  this.resolvedData.contentType
                )
              }

              // Now that the displayContent has been populated we are ready to
              // call the render function and display any notifications.
              this.render()
              // Notifications for live (current, from-the-websocket content)
              if (this.options.isLive) {
                new AppNotification (this).show()
              }
              // resolve the current state of the post, after everything is done,
              // back to the ORIGINAL function caller "new Transaction(txid, options)"
              resolve(this)
            })
          } else {
            // no hash or URL resolutions are required.

            // since no hash resolutions were needed (no promise callbacks to wait
            // for), we can render it and display notifications.
            this.render()
            // Notifications for live (current, from-the-websocket content)
            if (this.options.isLive) {
              new AppNotification (this).show()
            }
            // resolve the current state of the post, after everything is done,
            // back to the ORIGINAL function caller "new Transaction(txid, options)"
            resolve(this)
          }
        }) //nameManager resolve
      } // if isCurrentPostRedundant === false
    }) // return new Promise
  } // init

  // renders the post to the page.
  render () {
    if (typeof this.displayContent[0] === 'undefined') { // only render content.
      return false
    }

    // NOTE that tag is overridden by parentUID when the post is being rendered
    // as a child (reply) of another post.
    var tag = '#posts' // where the post is rendered.

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
    timeText.text(
      Utilities.readableTimeDiff(
        Utilities.getCurrentTimestamp() - this.time
      )
    )

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
        log (
          'post',
          'Post.render:',
          this.uid + ':',
          'No parent UID given, rendering based on isLive'
        )
      if (this.options.isLive) {
        $(tag).prepend(postDiv)
      } else {
        $(tag).append(postDiv)
      }
    } else { // insert the post at the location of the parent UID
      log (
        'post',
        'Post.render:',
        this.uid + ':',
        'ParentUID was defined as ',
        this.options.parentUID,
        ', rendering after parentUID on the page'
      )
      $('#' + this.options.parentUID).after(postDiv)
    }
  }

  // loads the replies to this post.
  loadReplies () {
      log (
        'post',
        'Post.loadReplies:',
        this.uid + ':',
        'Rendering children with parameters:',
        {
          parentUID: this.uid,
          UIReplyIndent: this.options.UIReplyIndent + 1,
          loadChildren: true
        }
      )
    networkManager.loadTransactionsByAddress(
        this.sender,
        {
          parentUID: this.uid,
          UIReplyIndent: this.options.UIReplyIndent + 1,
          loadChildren: true
        }
      )
  }

}
