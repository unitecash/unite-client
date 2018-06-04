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
    this.backgroundID = Utilities.getRandomChars(16)
    this.tag = tag
    return this
  }

  show () {
    if (this.options.playSound) {
      Utilities.pop()
    }

    var alertBackground = $('<div></div>')
    alertBackground.attr('style', 'z-index: ' + app.highestZIndexUsed)
    alertBackground.attr('class', 'UIDimmedBackground hidden')
    alertBackground.attr('id', this.backgroundID)
    $('body').on('click', '#' + this.backgroundID, () => {
      this.hide()
    })

    $('body').append(alertBackground)
    $('#' + this.backgroundID).fadeIn(this.options.animationSpeed)
    $(this.tag).slideDown(this.options.animationSpeed)
    $(this.tag).attr('style', 'z-index:' + (app.highestZIndexUsed + 1))
    $(this.tag).css('display', 'inline')

    document.activeElement.blur()
    app.highestZIndexUsed += 2
  }

  // thanks to https://stackoverflow.com/a/7259663/5860286 for this
  hide () {
    if (this.options.playSound) {
      Utilities.woosh()
    }
    $(this.tag).fadeOut(this.options.animationSpeed)
    $.when($('#' + this.backgroundID).fadeOut(this.options.animationSpeed)).done(function () {
      $('#' + this.backgroundID).remove()
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
