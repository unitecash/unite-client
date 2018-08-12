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
    this.address = Utilities.stripAddressPrefix(addr)
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
    var uid = Utilities.getRandomChars(16)
    var nameSpan = $('<span></span>')
    nameSpan.attr('id', uid)
    nameSpan.attr('class', 'UITextButton')
    var nameHash = $('<img></img>')
    nameHash.attr('src', this.calcHash())
    nameHash.attr('alt', 'Address: ' + this.address)
    nameHash.attr('title', 'Address: ' + this.address)
    nameHash.attr('class', 'UIInlineNameHash')
    nameSpan.append(nameHash)
    nameSpan.append(this.displayName)
    $(document).on('click', '#' + uid, () => {
      Utilities.redirect('./profile.html?addr=' + this.address)
    })
    return nameSpan
  }

  getHeaderName () {
    var uid = Utilities.getRandomChars(16)
    var nameSpan = $('<span></span>')
    nameSpan.attr('id', uid)
    nameSpan.attr('class', 'UITextButton')

    var nameText = $('<p></p>')
    nameText.attr('class', 'name')
    nameText.text(this.senderName.displayName)
    $(document).on('click', '#' + uid + 'name', () => {
      Utilities.redirect('./profile.html?addr=' + this.sender)
    })

    var nameHash = $('<img></img>')
    nameHash.attr('src', this.senderName.calcHash())
    nameHash.attr('alt', 'Address: ' + this.sender)
    nameHash.attr('title', 'Address: ' + this.sender)
    nameHash.attr('id', uid + 'namehash')
    nameHash.attr('class', 'UIPostNameHash UITextButton')
    $(document).on('click', '#' + uid + 'namehash', () => {
      Utilities.redirect('./profile.html?addr=' + this.sender)
    })

  }

}
