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
  static pop () {
    new Audio('./audio/pop.wav').play()
  }

  static boink () {
    new Audio('./audio/boink.wav').play()
  }

  static beep () {
    new Audio('./audio/beep.wav').play()
  }

  static woosh () {
    new Audio('./audio/woosh.wav').play()
  }

  static swooosh () {
    new Audio('./audio/swooosh.wav').play()
  }

  // thanks to https://stackoverflow.com/a/3745677/5860286 for this
  static hex2a (hexx) {
    hex = hexx.toString()
    str = ''
    for (i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
    }
    return str
  }

  // thanks to https://stackoverflow.com/a/1349426/5860286 for this
  static getRandomChars (length) {
    var text = ''
    var l = length || 16
    var poss = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < l; i++) {
      text += poss.charAt(Math.floor(Math.random() * poss.length))
    }
    return text
  }

  // thanks to https://stackoverflow.com/a/5915122/5860286 for this
  static getRandomFromArray (items) {
    return items[Math.floor(Math.random() * items.length)]
  }

  // thanks to https://stackoverflow.com/a/3277417/5860286 for this
  static closePopup () { // hacky
    document.elementFromPoint(10, 10).click()
  }

  static resolveGETParam (parameterName) { // hacky
    var result = null,
      tmp = []
    var items = location.search.substr(1).split('&')
    for (var index = 0; index < items.length; index++) {
      tmp = items[index].split('=')
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1])
    }
    return result
  }

  static redirect (URL) {
    if (typeof networkManager !== 'undefined') {
      networkManager.disconnect()
    }
    window.location.href = URL
  }

  static logOut () {
    $('*').fadeOut(1000)
    delete sessionStorage.privateKey
    setTimeout(() => {
      Utilities.redirect('login.html')
    }, 1100)
  }
}
