/**
 * Form Manager
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * Management of forms, click actions and other events
 *
 * @file Defines the FormManager class.
 */

export default class FormManager {
  constructor () {
    this.bindBackButtons()
    this.bindSendAction()
    this.bindSendReplyAction()
  }

  bindBackButtons () {
    window.$('#backbutton').on('click', () => {
      history.back()
    })
    window.$(document).on('keydown', (e) => { // hacky
      if (e.keyCode == 27) {
        window.Utilities.closePopup()
      }
    })
  }

  bindSendAction () {
    window.$('#sendpost').on('submit', function (ev) {
      ev.preventDefault()
      var post_text = window.$('#newpost').val()
      if (post_text.length < 1 || post_text.length > 217) {
        Messages.tempCharLimit(217)
      } else {
        PostBuilder.build(
          '5501',
          post_text,
          window.config.CENTRAL_CONTENT_ADDRESS,
          window.config.DUST_LIMIT_SIZE
        )
      }
    })
  }

  bindSendReplyAction () {
    window.$('#sendreply').on('submit', function (ev) {
      ev.preventDefault()
      var post_text = window.$('#newpost').val()
      if (post_text.length < 1 || post_text.length > 45) {
        Messages.tempCharLimit()
      } else {
        PostBuilder.build(
          '5503',
          post_text,
          topPost.sender,
          window.config.DUST_LIMIT_SIZE
        )
      }
    })
  }
}
