/**
 * Name
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * A class to store data related to users' names
 *
 * @file Provides the Name class
 */

export default class Name {

  constructor (addr, name, time) {
    this.address = window.Utilities.stripAddressPrefix(addr)
    this.displayName = name
    this.time = time
  }

  // TODO create integrated name hash image and inline HTML display functions
  calcHash () {
    var addr_h = sha512(this.address).substr(0, 32)
    var data = new Identicon(addr_h).toString()
    return 'data:image/png;base64,' + data
  }

  getInlineName () {
    var uid = window.Utilities.getRandomChars(16)
    var nameSpan = window.$('<span></span>')
    nameSpan.attr('id', uid)
    nameSpan.attr('class', 'UITextButton')
    var nameHash = window.$('<img></img>')
    nameHash.attr('src', this.calcHash())
    nameHash.attr('alt', 'Address: ' + this.address)
    nameHash.attr('title', 'Address: ' + this.address)
    nameHash.attr('class', 'UIInlineNameHash')
    nameSpan.append(nameHash)
    nameSpan.append(this.displayName)
    window.$(document).on('click', '#' + uid, () => {
      window.Utilities.redirect('./profile.html?addr=' + this.address)
    })
    return nameSpan
  }

  getHeaderName () {
    var uid = window.Utilities.getRandomChars(16)
    var nameSpan = window.$('<span></span>')
    nameSpan.attr('id', uid)
    nameSpan.attr('class', 'UITextButton')

    var nameText = window.$('<p></p>')
    nameText.attr('class', 'name')
    nameText.text(this.senderName.displayName)
    window.$(document).on('click', '#' + uid + 'name', () => {
      window.Utilities.redirect('./profile.html?addr=' + this.sender)
    })

    var nameHash = window.$('<img></img>')
    nameHash.attr('src', this.senderName.calcHash())
    nameHash.attr('alt', 'Address: ' + this.sender)
    nameHash.attr('title', 'Address: ' + this.sender)
    nameHash.attr('id', uid + 'namehash')
    nameHash.attr('class', 'UIPostNameHash UITextButton')
    window.$(document).on('click', '#' + uid + 'namehash', () => {
      window.Utilities.redirect('./profile.html?addr=' + this.sender)
    })

  }

}
