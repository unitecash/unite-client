/**
 * Error Banners
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * Provides a template for creating error banners.
 *
 * @file Defines the ErrorBanner class.
 */

import Banner from './Banner'

export default class ErrorBanner extends Banner {
  constructor (text, options) {
    if (typeof options === 'undefined') {
      options = {}
    }
    if (typeof options.backgroundColor === 'undefined') {
      options.backgroundColor = '#660033'
    }
    super(text, options)
    return this
  }
}
