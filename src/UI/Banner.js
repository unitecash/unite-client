/**
 * Banners
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * Provides a class for creating on-screen banners
 *
 * @file Defines the Banner class.
 */

export default class Banner {
  constructor (text, options) {
    if (typeof options === 'undefined') {
      options = {}
    }
    if (typeof options.animationSpeed === 'undefined') {
      options.animationSpeed = 250
    }
    if (typeof options.playSound === 'undefined') {
      options.playSound = true
    }
    if (typeof options.time === 'undefined') {
      options.time = 5000
    }
    if (typeof options.backgroundColor === 'undefined') {
      options.backgroundColor = '#660033'
    }
    this.options = options
    this.ID = window.Utilities.getRandomChars(16)
    this.closeButtonID = window.Utilities.getRandomChars(16)
    this.text = text
    return this
  }

  show () {
    if (this.options.playSound) {
      window.Utilities.boink() // TODO customize the sound to be played
    }

    var alertBanner = window.$('<div></div>')
    alertBanner.attr('class', 'banner')
    alertBanner.attr('id', this.ID)
    alertBanner.css('backgroundColor', this.options.backgroundColor)

    var closeButton = window.$('<button></button>')
    closeButton.attr('class', 'UICloseBannerButton')
    closeButton.attr('id', this.closeButtonID)
    closeButton.append('×')
    window.$('body').on('click', '#' + this.closeButtonID, () => {
      this.hide()
    })

    alertBanner.append(closeButton)
    alertBanner.append(this.text)
    window.$('body').append(alertBanner)
    window.$('#' + this.ID).hide()
    window.$('#' + this.ID).slideToggle(this.options.animationSpeed)
    setTimeout(() => {
      this.hide()
    }, this.options.time)
  }

  // thanks to https://stackoverflow.com/a/7259663/5860286 for this
  hide () {
    $.when(window.$('#' + this.ID).slideUp(this.options.animationSpeed)).done(function () {
      window.$('#' + this.ID).remove()
    })
  }

  setAnimationSpeed (speed) {
    this.options.animationSpeed = speed
    return this
  }

  setTime (time) {
    this.options.time = time
    return this
  }

  setOptions (options) {
    this.options = options
    return this
  }

  setBackgroundColor (backgroundColor) {
    this.options.backgroundColor = setBackgroundColor
    return this
  }
}
