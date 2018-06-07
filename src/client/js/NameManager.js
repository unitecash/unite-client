/**
 * NameManager
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * A class for querying, caching, storing, and retrieving Name objects
 *
 * @file Defines the NameManager class
 */

export default class NameManager {

  static consider (name) {
    var names = JSON.parse(localStorage.names)
    var doesExist = false
    for (var i = 0; i < names.length; i++) {
      if (names[i].address === name.address) {
        doesExist = true
        if (names[i].time < name.time) { // the stored value is old
          names[i] = name
        } else {
          if (config.DEBUG_MODE) {
            console.log ('Not adding name because it already exists.')
          }
        }
      }
    }
    if (!doesExist) {
      names.push (name)
    }
    localStorage.names = JSON.stringify(names)
  }

  static resolveFromAddress (addr) {
    return new Promise((resolve, reject) => {
      var success = false
      var names = JSON.parse (localStorage.names)
      for (var i = 0; i < names.length; i++) {
        if (names[i].address == addr) {
          success = true
          resolve(names[i])
        }
      }
      if (!success) {
        // declare an empty default name just in case none exists for this user
        var name = new Name(addr, addr.substr(0, 6), 0)
        var found_name = false
        networkManager.findCommonTransactions(addr, config.CENTRAL_PROFILE_ADDRESS).then((txid_arr) => {
          if (txid_arr) {
            (async function loop(){
              for (var i = 0; i < txid_arr.length; i++) {
                  await new Transaction(txid_arr[i])
              }
              var names = JSON.parse (localStorage.names)
              for (var i = 0; i < names.length; i++) {
                if (names[i].address === addr) {
                  found_name = true
                  resolve(names[i])
                }
              }
              if (!found_name) {
                resolve (name)
              }
            })()
          } else {
            resolve (name)
          }
        })
      }
    })
  }

  static resolveFromName (name) {
    // finds an address given a name, from CENTRAL_PROFILE_ADDRESS
  }

}
