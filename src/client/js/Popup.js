/**
 * Popup class
 * Author: The Unite.cash Developers
 * Licence: GNU AGPL v3
 *
 * This file provides a class for showing information in a popup dialog.
 *
 * @file Defines the Popup class
 */

import Utilities from './Utilities'

export default class Popup {

  /**
	 * Constructs a Popup object.
	 *
	 * @constructor
	 */
  constructor (text, title, isCentered, playSound, showCloseButton) {
    this.text = text
    this.title = title
    this.isCentered = isCentered
    this.playSound = playSound
    this.showCloseButton = showCloseButton
  }

  show(){
    if(this.playSound){
      Utilities.pop()
    }
    var randID = sha512('tomato'+new Date().toTimeString()+error).substr(0, 16);
		var newString = '<div style="z-index:'+window.app.highestZIndexUsed+';" class="UIDimmedBackground" id="';
		newString += randID+'a" onclick="$(\'#'+randID+'\').fadeOut(100);';
		newString += '$(\'#'+randID+'a\').fadeOut(100);woosh();setTimeout(function(){';
		newString += '$(\'#'+randID+'a\').remove();}, 150);"></div>';
		newString += '<div style="z-index:'+(window.app.highestZIndexUsed+1)+';" class="UIAlertWindow" id="';
		newString += randID+'">'+message+'</div>';
		$('body').append(newString);
		$('#'+randID).hide();
		$('#'+randID+'a').hide();
		$('#'+randID+'a').fadeIn(100);
		$('#'+randID).slideDown(100);
		document.activeElement.blur();
		window.app.highestZIndexUsed += 2;
  }

}
