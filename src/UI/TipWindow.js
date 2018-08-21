/**
 * Tip Window
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * @file Defines and displays the tipping window, given a post object
 */

export default class TipWindow {
  constructor (post) {
    var uid = post.txid.substr(0, 16)
    if ($('#' + uid + 'tipWindow').length === 0) {
      var tipWindow = $('<div></div>')
      tipWindow.attr('id', uid + 'tipWindow')
      tipWindow.attr('class', 'UIAlertWindow hidden')

      var tipTitle = $('<h1></h1>')
      tipTitle.attr('class', 'center-text')
      tipTitle.text('SEND A TIP')
      tipWindow.append(tipTitle)

      var tipLabel = $('<p></p>')
      tipLabel.text('Show how much you appreciate ')
      tipLabel.append(post.senderName.displayName) // TODO inlineDisplay
      tipLabel.append(' by sending a tip!')
      tipWindow.append(tipLabel)

      var tipForm = $('<form></form>')
      tipForm.attr('id', uid + 'tipForm')

      // TODO a slider above the text field, USD conversions
      var tipField = $('<input></input>')
      tipField.attr('type', 'number')
      tipField.attr('id', uid + 'tipAmount')
      tipField.attr('class', 'UITextField center w90')
      tipField.attr('placeholder', 'Amount (satoshis)')
      tipForm.append(tipField)

      var tipMessage = $('<textarea></textarea>')
      tipMessage.attr('id', uid + 'tipMessage')
      tipMessage.attr('class', 'UITextArea center w90')
      tipMessage.attr('placeholder', 'Write a short message (optional)')
      tipForm.append(tipMessage)

      var sendButton = $('<button></button>')
      sendButton.attr('type', 'submit')
      sendButton.attr('class', 'UIButton center w90')
      sendButton.text('SEND TIP')
      tipForm.append(sendButton)

      tipWindow.append(tipForm)

      $(document).on('submit', '#' + uid + 'tipForm', (ev) => {
        ev.preventDefault()
        var tipAmount = $('#' + uid + 'tipAmount').val()
        if ($('#' + uid + 'tipMessage').val().length !== 0) {
          var tipMessage = $('#' + uid + 'tipMessage').val()
        } else {
          var tipMessage = ''
        }
        if (post.sender === config.userAddress) {
          new Popup().setTitle('NARCISSISM?')
          .addText('You just tried to tip yourself. You failed. Miserably.')
          .show()
        } else {
          PostBuilder.build(
            '5503',
            tipMessage,
            post.sender,
            parseInt(tipAmount),
            config.DEFAULT_FEE_PER_BYTE,
            post.txid
          )
          $('#' + uid + 'tipAmount').val('')
          Utilities.closePopup()
        }
      })
      
      $('body').append(tipWindow)
    }
    new InteractivePopup('#' + uid + 'tipWindow').show()
  }
}
