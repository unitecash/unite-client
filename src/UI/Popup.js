/**
 * Popup class
 * Author: The Unite.cash Developers
 * Licence: GNU AGPL v3
 *
 * This file provides a class for showing information in a popup dialog.
 *
 * @file Defines the Popup class
 */

export default class Popup {
  /**
	 * Constructs a Popup object.
	 *
	 * @constructor
	 */
  constructor (options) {
    if (typeof options === 'undefined') {
      options = {}
    }
    if (typeof options.text === 'undefined') {
      options.text = ''
    }
    if (typeof options.animationSpeed === 'undefined') {
      options.animationSpeed = 100
    }
    if (typeof options.playSound === 'undefined') {
      options.playSound = true
    }
    if (typeof options.showCloseButton === 'undefined') {
      options.showCloseButton = false
    }
    if (typeof options.centered === 'undefined') {
      options.centered = false
    }
    this.options = options
    this.divID = window.Utilities.getRandomChars(16)
    this.backgroundID = window.Utilities.getRandomChars(16)
    if (this.options.showCloseButton) {
      this.closeButtonID = window.Utilities.getRandomChars(16)
    }
    return this
  }

  show () {
    return new Promise((resolve, reject) => {
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

      var alertHTML = window.$('<div></div>')
      alertHTML.attr('style', 'z-index: ' + (window.config.highestZIndexUsed + 1))
      alertHTML.attr('id', this.divID)
      if (this.options.isCentered) {
        alertHTML.attr('class', 'UIAlertWindow center center-text hidden')
      } else {
        alertHTML.attr('class', 'UIAlertWindow hidden')
      }

      if (this.options.titleText != undefined) {
        var alertTitle = window.$('<h3></h3>')
        alertTitle.attr('class', 'center-text')
        alertTitle.text(this.options.titleText)
        alertHTML.append(alertTitle)
      }

      if (this.options.showCloseButton) {
        var closeButton = window.$('<button></button>')
        closeButton.attr('class', 'UICloseButton')
        closeButton.attr('id', this.closeButtonID)
        window.$('body').on('click', '#' + this.closeButtonID, () => {
          resolve ()
          this.hide()
        })
        alertHTML.append(closeButton)
      }

      alertHTML.append(this.options.text)
      window.$('body').append(alertBackground)
      window.$('body').append(alertHTML)
      window.$('#' + this.backgroundID).fadeIn(this.options.animationSpeed)
      window.$('#' + this.divID).slideDown(this.options.animationSpeed)

      document.activeElement.blur()
      window.config.highestZIndexUsed += 2
    })
  }

  // thanks to https://stackoverflow.com/a/7259663/5860286 for this
  hide () {
    if (this.options.playSound) {
      window.Utilities.woosh()
    }
    window.$.when(window.$('#' + this.divID).fadeOut(this.options.animationSpeed)).done(function () {
      window.$('#' + this.divID).remove()
    })
    window.$.when(window.$('#' + this.backgroundID).fadeOut(this.options.animationSpeed)).done(function () {
      window.$('#' + this.backgroundID).remove()
    })
  }

  setTitle (title) {
    this.options.titleText = title
    return this
  }

  addText (text) {
    this.options.text += text
    return this
  }

  setText (text) {
    this.options.text = text
    return this
  }

  setAnimationSpeed (speed) {
    this.options.animationSpeed = speed
    return this
  }

  setIsCentered (centered) {
    this.options.centered = centered
    return this
  }

  setCloseButtonShown (showCloseButton) {
    this.options.showCloseButton = showCloseButton
  }

  setOptions (options) {
    this.options = options
    return this
  }
}
