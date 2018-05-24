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
  constructor (text, title, isCentered, playSound, showCloseButton) {
    this.text = text
    this.titleText = title
    this.isCentered = isCentered || false
    this.playSound = playSound || true
    this.showCloseButton = showCloseButton || false
    this.divID = window.Utilities.getRandomChars(16)
    this.backgroundID = window.Utilities.getRandomChars(16)
    if(this.showCloseButton){
      this.closeButtonID = window.Utilities.getRandomChars(16)
    }
  }

  show () {
    if(this.playSound){
      window.Utilities.pop()
    }

    var alertBackground = $('<div></div>')
    alertBackground.attr('style', 'z-index: ' + window.app.highestZIndexUsed)
    alertBackground.attr('class', 'UIDimmedBackground hidden')
    alertBackground.attr('id', this.backgroundID)
    $('body').on('click', '#' + this.backgroundID, function () {
      this.hide()
    })

    var alertHTML = $('<div></div>')
    alertHTML.attr('style', 'z-index: ' + (window.app.highestZIndexUsed+1))
    alertHTML.attr('id', this.divID)
    if(this.isCentered){
      alertHTML.attr('class', 'UIAlertWindow center-text hidden')
    }else{
      alertHTML.attr('class', 'UIAlertWindow hidden')
    }

    if(this.titleText != undefined){
      var alertTitle = $('<h1></h1>')
      alertTitle.text(this.titleText)
      alertHTML.append(alertTitle)
    }

    if(this.showCloseButton){
      var closeButton = $('<button></button>')
      closeButton.attr('class', 'UICloseButton')
      closeButton.attr('id', this.closeButtonID)
      $('body').on('click', '#' + this.closeButtonID, function () {
        this.hide()
      })
    }

    alertHTML.append(this.text)
		$('body').append(alertBackground)
    $('body').append(alertHTML)
		$('#' + this.backgroundID).fadeIn()
		$('#' + this.divID).slideDown()

		document.activeElement.blur()
		window.app.highestZIndexUsed += 2
  }

  // thanks to https://stackoverflow.com/a/7259663/5860286 for this
  hide () {
    if(this.playSound) {
      window.Utilities.woosh()
    }
    $.when($('#' + this.divID).fadeOut()).done(function() {
      $('#' + this.divID).remove()
    })
    $.when($('#' + this.backgroundID).fadeOut()).done(function() {
      $('#' + this.backgroundID).remove()
    })
  }

  setTitle (title) {
    this.titleText = title
  }

  addText (text) {
    this.text += text
  }

  setText (text) {
    this.text = text
  }

}
