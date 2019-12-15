/**
 * Image Button
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * @file Defines a class for creating and rendering ImageButtons
 */

export default class ImageButton {

  constructor (options) {
    if (typeof options === 'undefined') {
      options = {}
    }
    if (typeof options.text === 'undefined') {
      options.text = 'Button'
    }
    if (typeof options.image === 'undefined') {
      options.image = './images/icon.svg'
    }
    if (typeof options.onclick === 'undefined') {
      options.onclick = () => {
        console.log('Button clicked')
      }
    }
    this.options = options
    this.uid = window.Utilities.getRandomChars(16)
  }

  render () {
    var button = window.$('<button></button>')
    button.attr('id', this.uid)
    button.attr('class', 'transparent')

    var image = window.$('<img></img>')
    image.attr('src', this.options.image)
    image.attr('alt', this.options.text)
    image.attr('title', this.options.text)
    image.attr('class', 'UIImageButton')
    button.append(image)

    window.$(document).on('click', '#' + this.uid, () => {
      this.options.onclick()
    })

    return button
  }

}
