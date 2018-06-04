/**
 * Success Banners
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * Provides a template for creating success banners.
 *
 * @file Defines the ErrorBanner class.
 */

import Banner from './Banner'

export default class SuccessBanner extends Banner {
  constructor (text, options) {
    if (typeof options === 'undefined') {
      options = {}
    }
    if (typeof options.backgroundColor === 'undefined') {
      options.backgroundColor = '#114411'
    }
    super(text, options)
    return this
  }
}
