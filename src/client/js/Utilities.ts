/**
 * Useful utility functions
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * This script provides some useful general utility functions.
 *
 * @file Provides the Utilities class.
 */

export default class Utilities {

  pop(){
		new Audio('./audio/pop.wav').play();
	}

	boink(){
		new Audio('./audio/boink.wav').play();
	}

	beep(){
		new Audio('./audio/beep.wav').play();
	}

	woosh(){
		new Audio('./audio/woosh.wav').play();
	}

	swooosh(){
		new Audio('./audio/swooosh.wav').play();
	}

  // thanks to https://stackoverflow.com/a/3745677/5860286 for this
  hex2a(hexx) {
		hex = hexx.toString();
		str = '';
		for(i = 0; i < hex.length; i += 2) {
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		}
		return str;
	}

  // thanks to https://stackoverflow.com/a/1349426/5860286 for this
  getRandomChars(length) {
    var text = "";
    var l = length || 16;
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < l; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  // thanks to https://stackoverflow.com/a/3277417/5860286 for this
  goBack(){
     document.elementFromPoint(10, 10).click(); // TODO his is hacky and should be re-done
  }


}