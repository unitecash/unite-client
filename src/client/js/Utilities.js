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
    var hex = hexx.toString()
    var str = ''
    for (var i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
    }
    return str
  }

  // converts hex into buffer array
  static hex2buf (hex) {
    var arr = []
    for (var i = 0; i < hex.length; i+=2) {
      arr.push (parseInt ('' + hex[i] + hex[i+1], 16))
    }
    return arr
  }

  static ascii2buf (ascii) {
    var arr = []
    for (var i = 0; i < ascii.length; i++) {
      arr.push (ascii.charCodeAt(i))
    }
    return arr
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
    var result = false,
      tmp = []
    var items = location.search.substr(1).split('&')
    for (var index = 0; index < items.length; index++) {
      tmp = items[index].split('=')
      if (tmp[0] === parameterName) {
        result = decodeURIComponent (tmp[1])
      }
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

  static obtainFocus () {
    // attempt to get focus from the browser
    parent.focus()
    // if applicable, attempt to get focus on the Electron app window
    if (typeof require !== undefined) {
      require('electron').remote.getCurrentWindow().show()
      require('electron').remote.getCurrentWindow().setAlwaysOnTop(true)
      require('electron').remote.getCurrentWindow().focus()
      require('electron').remote.getCurrentWindow().setAlwaysOnTop(false)
    }
  }

  static goBack () {
    $('#content').animate({"marginLeft": "100%"}, 250)
    history.back()
  }

  static stripAddressPrefix (address) {
    if (address.split(':')[1] === undefined) {
      return address
    } else {
      return address.split(':')[1]
    }
  }

  static privateKeyFromLoginCredentials(user, pass) {
    // current implementation of key stretching algorithm
    var key = sha512('memologin:' + user + pass)
    key = key.substr(0, pass.length)
    key = sha512(key)
    for (var i = 0;
      i < $('#user').val().length * $('#pass').val().length &&
        i < 500; i++) {
      var n = 'bar'
      var m = 3301
      for (var j = 0; j < i; j++) {
        n += 'fooo'
        m += n.length
      }
      key = sha512(n + key + (m - i))
    }
    key = bch.crypto.BN.fromString(key.substr(0, 32))
    return new bch.PrivateKey(key).toWIF()
  }

  static fileToIPFSHash (file) {
    return new Promise ((resolve, reject) => {
      // convert file to buffer.
      var reader = new FileReader()
      reader.onload = function(e) {
        var buf = new Buffer(e.target.result)
        networkManager.IPFSNode.files.add({
          "only-hash": true,
          "content": buf,
          "path": "file"
        }).then((res) => {
          resolve (res[0].hash)
        })
      }
      reader.readAsArrayBuffer(file)
    })
  }

  static toAddress (addr) {
    return Utilities.stripAddressPrefix(
      bchaddr.toCashAddress(
        addr
      )
    )
  }

}
