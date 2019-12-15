/**
 * Logger
 * Author: The Unite.cash developers
 * License: GNU AGPL v3
 *
 * @file Defines debug and logging functions and categories
 */

export default class Logger {

  // accepts a category and logging parameters. If appropriate, logs a message
  // to the console.
  static log (cat, ...args) {
    const debug = window.config.DEBUG_MODE
    const categories = window.config.LOGGING_CATEGORIES
    if (debug) {
      if (categories.indexOf('all') !== -1 ||
          categories.indexOf(cat) !== -1){
        console.log(...args)
      }
    }
  }

  static error (cat, ...args) {
    const debug = window.config.DEBUG_MODE
    const categories = window.config.LOGGING_CATEGORIES
    if (debug) {
      if (categories.indexOf('all') !== -1 ||
          categories.indexOf(cat) !== -1){
        console.error(...args)
      }
    }
  }

}
