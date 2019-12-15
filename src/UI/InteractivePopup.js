/**
 * Interactive popup
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * Provides a class for creating interactive popup windows out of HTML elements.
 *
 * @file Defines the InteractivePopup class.
 */

export default class InteractivePopup {
  constructor (tag, options) {
    if (typeof options === 'undefined') {
      options = {}
    }
    if (typeof options.animationSpeed === 'undefined') {
      options.animationSpeed = 100
    }
    if (typeof options.playSound === 'undefined') {
      options.playSound = true
    }
    this.options = options
    this.backgroundID = window.Utilities.getRandomChars(16)
    this.tag = tag
    return this
  }

  show () {
    return new Promise ((resolve, reject) => {
      if (this.options.playSound) {
        window.Utilities.pop()
      }

      var alertBackground = window.$('<div></div>')
      alertBackground.attr('style', 'z-index: ' + window.config.highestZIndexUsed)
      alertBackground.attr('class', 'UIDimmedBackground hidden')
      alertBackground.attr('id', this.backgroundID)
      window.$('body').on('click', '#' + this.backgroundID, () => {
        resolve ()
        this.hide()
      })

      window.$('body').append(alertBackground)
      window.$('#' + this.backgroundID).fadeIn(this.options.animationSpeed)
      window.$(this.tag).slideDown(this.options.animationSpeed)
      window.$(this.tag).attr('style', 'z-index:' + (window.config.highestZIndexUsed + 1))
      window.$(this.tag).css('display', 'inline')

      document.activeElement.blur()
      window.config.highestZIndexUsed += 2
    })
  }

  // thanks to https://stackoverflow.com/a/7259663/5860286 for this
  hide () {
    if (this.options.playSound) {
      window.Utilities.woosh()
    }
    window.$(this.tag).fadeOut(this.options.animationSpeed)
    $.when(window.$('#' + this.backgroundID).fadeOut(this.options.animationSpeed)).done(function () {
      window.$('#' + this.backgroundID).remove()
    })
  }

  setAnimationSpeed (speed) {
    this.options.animationSpeed = speed
    return this
  }

  setOptions (options) {
    this.options = options
    return this
  }
}
