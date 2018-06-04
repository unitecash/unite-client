/**
 * Name
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * A class to store data related to users' names
 *
 * @file Provides the Name class
 */

// Returns the name object given an address. Uses caching, returns first 6 of address if no name.
/* TODO:
- unique immutable hash symbol (color and shape) based on address to deter spoofing
*/
var get_name = function (addr) {
  return new Promise(function (resolve, reject) {
    var success = false
    var names = JSON.parse(localStorage.names)
    // declare an empty default name just in case none exists
    var name = {address: addr, name: addr.substr(0, 6), time: 0, hash: get_name_hash(addr)}
    for (var i = 0; i < names.length; i++) {
      if (names[i].address == addr) {
        success = true
        resolve(names[i])
      }
    }
    if (!success) {
      get_transactions(addr).then(function (tx_arr) {
        var found_name = false
        for (var j = 0; j < tx_arr.length; j++) {
          var input = tx_arr[j]
          var time = input.time
          for (var i = 0; i < input.vout.length; i++) {
            if (!input.vout[i].scriptPubKey.asm.startsWith('OP_RETURN')) continue
            code = input.vout[i].scriptPubKey.asm.substring(10, 14)
            data = input.vout[i].scriptPubKey.asm.substring(14, input.length)
            data = hex2a(data)
            if (code == '5504') {
              found_name = true
              set_name(addr, data.substr(0, 24), time)
              // name = data.substr(0, 24);
              get_name(addr).then(function (name) { // this should be re-done
                resolve(name)
              })
            }
          }
        }
        if (!found_name) {
          // set_name(addr, addr.substr(0, 6), 0); // uncomment to reduce load on server
          resolve(name)
        }
      })
    }
  })
}

// Sets a users name and decides if the new name should be kept based on timestamp
/* TODO:
- Check for and remove duplicate entries to prevent arbitrary results when cache is queried
*/
var set_name = function (addr, name, time) {
  var names = JSON.parse(localStorage.names)
  var doesExist = false
  for (var i = 0; i < names.length; i++) {
    if (names[i].address == addr) {
      doesExist = true
      if (names[i].time < time) { // the stored value is old
        delete names[i]
        var new_name = {address: addr, name: name, time: time, hash: get_name_hash(addr)}
        // change all posts with this sender to the new name
        var posts = JSON.parse(localStorage.posts)
        for (var i = 0; i < posts.length; i++) {
          if (posts[i].sender == addr) {
            posts[i].name = new_name
          }
        }
        localStorage.posts = JSON.stringify(posts)
        names[i] = new_name
      } else {
        if (debug) {
          console.log('Not adding name because it already exists.')
        }
      }
    }
  }
  if (!doesExist) {
    var new_name = {address: addr, name: name, time: time, hash: get_name_hash(addr)}
    // change all posts with this sender to the new name
    var posts = JSON.parse(localStorage.posts)
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].sender == addr) {
        posts[i].name = new_name
      }
    }
    localStorage.posts = JSON.stringify(posts)
    names.push(new_name)
  }
  localStorage.names = JSON.stringify(names)
}

// Returns a unique "identicon" based on the address given
var get_name_hash = function (addr) {
  var addr_h = sha512(addr).substr(0, 32)
  var data = new Identicon(addr_h).toString()
  var img = '<img class="UINameIcon" src="data:image/png;base64,' + data + '" alt="Real Address: ' + addr + '" poster="Real Address: ' + addr + '" />'
  return img
}
