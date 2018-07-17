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
      this.uid = Utilities.stripAddressPrefix(config.userAddress).substr(0, 16)
    } else {
      this.post = post
      this.title = 'Reply to ' + this.post.senderName.displayName
      this.uid = Utilities.stripAddressPrefix(this.post.senderName.address.substr(0, 16))
    }

    if (!$('#' + this.uid).length) {
      this.dialog = $('<div></div>')
      this.dialog.attr('class', 'UIAlertWindow hidden')
      this.dialog.attr('id', this.uid)

      this.dialogHeading = $('<div></div>')
      this.dialogHeading.attr('class', 'UIAlertHeader')

      this.dialogTitle = $('<h3></h3>')
      this.dialogTitle.attr('class', 'center-text w60')
      this.dialogTitle.text(this.title)
      this.dialogHeading.append(this.dialogTitle)

      this.sendButton = new ImageButton({
        image: './images/send_icon.svg',
        text: 'Send',
        onclick: () => {
          // When a post is sent.
          // check if this post requires IPFS uploads
          if ($('#' + this.uid + 'text').val().length > 180 ||
              typeof this.fileUploadInput.files !== 'undefined') {
            // upload to IPFS

            // ...

          } else {
            // put it on-chain in an OP_RETURN
            if (typeof this.post === 'undefined') { // not in reply to anyone
              PostBuilder.build(
                '5501',
                $('#' + this.uid + 'text').val(),
                config.CENTRAL_CONTENT_ADDRESS
              )
            } else {
              PostBuilder.build(
                '5503',
                $('#' + this.uid + 'text').val(),
                this.post.senderName.address,
                config.DUST_LIMIT_SIZE,
                config.DEFAULT_FEE_PER_BYTE,
                this.post.txid
              )
            }
          }
          Utilities.closePopup()
        }
      }).render()
      this.sendButton.attr('class', 'UIImageButton transparent right')
      this.dialogHeading.append(this.sendButton)
      this.dialog.append(this.dialogHeading)

      this.textInput = $('<textarea></textarea>')
      this.textInput.attr('class', 'UITextArea')
      this.textInput.attr('id', this.uid + 'text')
      this.dialog.append(this.textInput)

      this.fileUploadInput = $('<input></input>')
      this.fileUploadInput.attr('type', 'file')
      this.fileUploadInput.attr('style', 'display:none;')
      this.fileUploadInput.attr('id', this.uid + 'file')
      this.dialog.append(this.fileUploadInput)
      $('body').on('change', '#' + this.uid + 'file', (ev) => {
        var input = $('#' + this.uid + 'file')
        if (input.files && input.files[0]) {
          var reader = new FileReader()
          reader.onload = function(e) {
            $('#' + uid + 'filepreview').attr('src', e.target.result)
          }
          reader.readAsDataURL(input.files[0])
        }
      })

      this.fileUploadButton = new ImageButton({
        image: './images/underline_icon.svg',
        text: 'Upload Files...',
        onclick: () => {
          $('#' + this.uid + 'file').trigger('click')
        }
      }).render()
      this.fileUploadButton.attr('class', 'UIImageButton transparent left')
      this.dialog.append(this.fileUploadButton)

      $('body').append(this.dialog)
    }

    new InteractivePopup('#' + this.uid).show()
  }

}
