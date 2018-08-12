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
    $('#backbutton').on('click', () => {
      history.back()
    })
    $(document).on('keydown', (e) => { // hacky
      if (e.keyCode == 27) {
        Utilities.closePopup()
      }
    })
  }

  bindSendAction () {
    $('#sendpost').on('submit', function (ev) {
      ev.preventDefault()
      var post_text = $('#newpost').val()
      if (post_text.length < 1 || post_text.length > 217) {
        Messages.tempCharLimit(217)
      } else {
        PostBuilder.build(
          '5501',
          post_text,
          config.CENTRAL_CONTENT_ADDRESS,
          config.DUST_LIMIT_SIZE
        )
      }
    })
  }

  bindSendReplyAction () {
    $('#sendreply').on('submit', function (ev) {
      ev.preventDefault()
      var post_text = $('#newpost').val()
      if (post_text.length < 1 || post_text.length > 45) {
        Messages.tempCharLimit()
      } else {
        PostBuilder.build(
          '5503',
          post_text,
          topPost.sender,
          config.DUST_LIMIT_SIZE
        )
      }
    })
  }
}
