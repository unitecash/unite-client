/**
 * Notification
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * Define a class for storing data about notifications
 *
 * TODO:
 * - Deep linking functionality
 *
 * @file Defines the Notification class
 */

export default class Notification {
  /*
  * @constructor
  *
  * Constructs Notification objects
  *
  * @param post: A post from which the notification is parsed
  */
  constructor (post, options) {
    if (typeof options === 'undefined') {
      options = {}
    }
    if (typeof options.maxLength === 'undefined') {
      options.maxLength = 150
    }
    if (typeof options.displayTime === 'undefined') {
      options.displayTime = 5000
    }
    if (typeof options.playSound === 'undefined') {
      options.playSound = true
    }
    this.options = options
    if (post.type === '5501') {
      this.title = post.senderName.displayName
      this.body = post.data
    }
    if (post.type === '5503') {
      this.title = post.senderName.displayName
      this.body = 'Replied to a post'
    }
    if (post.type === '5504') {
      this.title = post.sender.substr(0, 6)
      this.body = 'Changed their name to ' + post.senderName.displayName
    }
    if (config.DEBUG_MODE) {
      console.log(
        'Notification.constructor:',
        'Constructed notification:',
        this
      )
    }
    return this
  }

  show () {
    if (this.options.playSound) {
      Utilities.pop()
    }
    if (!document.hasFocus()) { // the user is not using the application
      var n = new window.Notification(
        this.title,
        {
          icon: './images/icon.png',
          body: this.body.substr(0, this.options.maxLength)
        }
      )
      n.onclick = function (ev) {
        Utilities.obtainFocus()
      }
    } else { // the user is using the application
      new SuccessBanner(this.title + ': ' + this.body).show()
    }
  }

}
