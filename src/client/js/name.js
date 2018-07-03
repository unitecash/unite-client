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
  calcHash(){
    var addr_h = sha512(this.address).substr(0, 32)
    var data = new Identicon(addr_h).toString()
    return 'data:image/png;base64,' + data
  }
}
