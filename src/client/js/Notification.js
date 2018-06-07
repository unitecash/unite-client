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
    if (post.type == '5501') {
      this.title = post.name.name
      this.body = post.data
    }
    if (post.type == '5504') {
      this.title = post.sender.substr(0, 6)
      this.body = 'Changed their name to ' + post.name.name
    }
    return this
  }

  show () {
    if (this.options.playSound) {
      Utilities.pop()
    }
    if (!document.hasFocus()) { // the user is not using the application
      var n = new Notification(
        this.title,
        {icon: './images/icon.png',
          body: this.body})
      n.onclick = function (ev) {
        this.obtainFocus()
      }
    } else { // the user is using the application
      new SuccessBanner(this.title + ': ' + this.body).show()
    }
  }

  obtainFocus () {
    // attempt to get focus from the browser
    parent.focus()
    // if applicable, attempt to get focus on the Electron app window
    if (typeof require !== undefined) {
      var win = require('electron').remote.getCurrentWindow()
      win.show()
      win.setAlwaysOnTop(true)
      win.focus()
      win.setAlwaysOnTop(false)
    }
  }
}
