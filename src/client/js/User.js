/*
 * User
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * @file Defines a class for managing data related to users.
 */

export default class User {

  constructor (address) {
    return new Promise((resolve, reject) => {
      if (typeof address === 'undefined') {
        console.error('No address passed to User constructor')
        resolve (false)
      }
      this.address = address
      NameManager.resolveFromAddress(this.address).then((name) => {
        this.name = name
        // ...
        resolve(this)
      })
    })
  }

  loadPosts () {
    networkManager.loadTransactionsByAddress(this.address)
  }

}
