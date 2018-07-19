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
              (typeof window.attachedFiles !== 'undefined' &&
              typeof window.attachedFiles[0] !== 'undefined')) {
            // upload it to IPFS
            // create a JSON object to hold the content of the post
            var postContent = {
              text: $('#' + this.uid + 'text').val(),
              files: window.attachedFiles
            }
            if (typeof this.post === 'undefined') {
              PostBuilder.build({
                type: '5502',
                content: postContent,
                parentAddress: config.CENTRAL_CONTENT_ADDRESS
              })
            } else {
              PostBuilder.build({
                type: '5505',
                content: postContent,
                parentAddress: this.post.senderName.address,
                parentTXID: this.post.txid
              })
            }
          } else {
            // put it on-chain in an OP_RETURN
            if (typeof this.post === 'undefined') { // not in reply to anyone
              PostBuilder.build({
                type: '5501',
                content: $('#' + this.uid + 'text').val(),
                parentAddress: config.CENTRAL_CONTENT_ADDRESS
              })
            } else {
              PostBuilder.build({
                type: '5503',
                content: $('#' + this.uid + 'text').val(),
                parentAddress: this.post.senderName.address,
                parentTXID: this.post.txid
              })
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
        var input = document.getElementById(this.uid + 'file')
        window.attachedFiles = input.files

        // TODO Previewing of the different filetypes.
        // This will come along with the UX update for this whole CompWindow.

        //if (input.files && input.files[0]) {
          // preview the file
          /*var reader = new FileReader()
          reader.onload = function(e) {
            $('#' + uid + 'filepreview').attr('src', e.target.result)
          }
          reader.readAsDataURL(input.files[0])*/
        //}
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
