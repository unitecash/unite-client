/**
 * Popup class
 * Author: The Unite.cash Developers
 * Licence: GNU AGPL v3
 *
 * This file provides a class for showing information in a popup dialog.
 *
 * @file Defines the Popup class
 */

import $ from './lib/jquery.js'

import Utilities from './Utilities'

export default class Popup {

  /**
	 * Constructs a Popup object.
	 *
	 * @constructor
	 */
  constructor (options) {
    if (typeof options === "undefined") {
      options = {}
    }
    if (typeof options.text === "undefined") {
      options.text = ''
    }
    if (typeof options.animationSpeed === "undefined") {
      options.animationSpeed = 100
    }
    if (typeof options.playSound === "undefined") {
      options.playSound = true
    }
    if (typeof options.showCloseButton === "undefined") {
      options.showCloseButton = false
    }
    if (typeof options.centered === "undefined") {
      options.centered = false
    }
    this.options = options
    this.divID = window.Utilities.getRandomChars(16)
    this.backgroundID = window.Utilities.getRandomChars(16)
    if(this.options.showCloseButton) {
      this.closeButtonID = window.Utilities.getRandomChars(16)
    }
    return this
  }

  show () {
    if(this.options.playSound){
      window.Utilities.pop()
    }

    var alertBackground = $('<div></div>')
    alertBackground.attr('style', 'z-index: ' + window.app.highestZIndexUsed)
    alertBackground.attr('class', 'UIDimmedBackground hidden')
    alertBackground.attr('id', this.backgroundID)
    $('body').on('click', '#' + this.backgroundID, () => {
      this.hide()
    })

    var alertHTML = $('<div></div>')
    alertHTML.attr('style', 'z-index: ' + (window.app.highestZIndexUsed+1))
    alertHTML.attr('id', this.divID)
    if(this.options.isCentered){
      alertHTML.attr('class', 'UIAlertWindow center-text hidden')
    }else{
      alertHTML.attr('class', 'UIAlertWindow hidden')
    }

    if(this.options.titleText != undefined){
      var alertTitle = $('<h1></h1>')
      alertTitle.text(this.options.titleText)
      alertHTML.append(alertTitle)
    }

    if(this.options.showCloseButton){
      var closeButton = $('<button></button>')
      closeButton.attr('class', 'UICloseButton')
      closeButton.attr('id', this.closeButtonID)
      $('body').on('click', '#' + this.closeButtonID, () => {
        this.hide()
      })
    }

    alertHTML.append(this.options.text)
		$('body').append(alertBackground)
    $('body').append(alertHTML)
		$('#' + this.backgroundID).fadeIn(this.options.animationSpeed)
		$('#' + this.divID).slideDown(this.options.animationSpeed)

		document.activeElement.blur()
		window.app.highestZIndexUsed += 2
  }

  // thanks to https://stackoverflow.com/a/7259663/5860286 for this
  hide () {
    if(this.options.playSound) {
      window.Utilities.woosh()
    }
    $.when($('#' + this.divID).fadeOut(this.options.animationSpeed)).done(function() {
      $('#' + this.divID).remove()
    })
    $.when($('#' + this.backgroundID).fadeOut(this.options.animationSpeed)).done(function() {
      $('#' + this.backgroundID).remove()
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

  setAnimationSpeed(speed){
    this.options.animationSpeed = speed
    return this
  }

  setOptions(options){
    this.options = options;
    return this
  }

}
