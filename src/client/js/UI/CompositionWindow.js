/**
 * Composition Window
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * @file Defines the post composition dialog box.
 */

export default class CompositionWindow {

  constructor (post) {
    if (typeof post === 'undefined') {
      this.title = 'New Post'
    } else {
      this.title = 'Reply to ' + post.senderName.displayName
    }
    this.post = post

    var uid = Utilities.getRandomChars(16)
    var dialog = $('<div></div>')
    dialog.attr('class', 'UIAlertWindow hidden')
    dialog.attr('id', uid)

    var dialogHeading = $('<div></div>')
    dialogHeading.attr('class', 'UIAlertHeader')

    var dialogTitle = $('<h3></h3>')
    dialogTitle.attr('class', 'center-text w90')
    dialogTitle.text(this.title)
    dialogHeading.append(dialogTitle)

    var sendButton = new ImageButton({
      image: './images/send_icon.svg',
      text: 'Send',
      onclick: () => {
        if (typeof this.post === 'undefined') { // not in reply to anyone
          PostBuilder.build(
            '5501',
            $('#' + uid + 'text').val(),
            config.CENTRAL_CONTENT_ADDRESS
          )
        } else {
          PostBuilder.build(
            '5503',
            $('#' + uid + 'text').val(),
            this.post.senderName.address,
            config.DUST_LIMIT_SIZE,
            config.DEFAULT_FEE_PER_BYTE,
            this.post.txid
          )
        }
        Utilities.closePopup()
        new SuccessBanner('Your post has been sent!').show()
      }
    }).render()
    sendButton.attr('class', 'UIImageButton transparent right')
    dialogHeading.append(sendButton)
    dialog.append(dialogHeading)

    var textInput = $('<textarea></textarea>')
    textInput.attr('class', 'UITextArea')
    textInput.attr('id', uid + 'text')
    dialog.append(textInput)

    $('body').append(dialog)
    new InteractivePopup('#' + uid).show()
  }

}
