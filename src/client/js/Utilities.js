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
		new Audio('./res/pop.wav').play();
	}

	boink(){
		new Audio('./res/boink.wav').play();
	}

	beep(){
		new Audio('./res/beep.wav').play();
	}

	woosh(){
		new Audio('./res/woosh.wav').play();
	}

	swooosh(){
		new Audio('./res/swooosh.wav').play();
	}

  hex2a(hexx) {
		hex = hexx.toString();
		str = '';
		for(i = 0; i < hex.length; i += 2)
		{
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		}
		return str;
	}

  goBack(){
    document.elementFromPoint(10, 10).click();
  }

}
