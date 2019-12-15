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
    if (window.$('#' + uid + 'tipWindow').length === 0) {
      var tipWindow = window.$('<div></div>')
      tipWindow.attr('id', uid + 'tipWindow')
      tipWindow.attr('class', 'UIAlertWindow hidden')

      var tipTitle = window.$('<h1></h1>')
      tipTitle.attr('class', 'center-text')
      tipTitle.text('SEND A TIP')
      tipWindow.append(tipTitle)

      var tipLabel = window.$('<p></p>')
      tipLabel.text('Show how much you appreciate ')
      tipLabel.append(post.senderName.displayName) // TODO inlineDisplay
      tipLabel.append(' by sending a tip!')
      tipWindow.append(tipLabel)

      var tipForm = window.$('<form></form>')
      tipForm.attr('id', uid + 'tipForm')

      // TODO a slider above the text field, USD conversions
      var tipField = window.$('<input></input>')
      tipField.attr('type', 'number')
      tipField.attr('id', uid + 'tipAmount')
      tipField.attr('class', 'UITextField center w90')
      tipField.attr('placeholder', 'Amount (satoshis)')
      tipForm.append(tipField)

      var tipMessage = window.$('<textarea></textarea>')
      tipMessage.attr('id', uid + 'tipMessage')
      tipMessage.attr('class', 'UITextArea center w90')
      tipMessage.attr('placeholder', 'Write a short message (optional)')
      tipForm.append(tipMessage)

      var sendButton = window.$('<button></button>')
      sendButton.attr('type', 'submit')
      sendButton.attr('class', 'UIButton center w90')
      sendButton.text('SEND TIP')
      tipForm.append(sendButton)

      tipWindow.append(tipForm)

      window.$(document).on('submit', '#' + uid + 'tipForm', (ev) => {
        ev.preventDefault()
        var tipAmount = window.$('#' + uid + 'tipAmount').val()
        if (window.$('#' + uid + 'tipMessage').val().length !== 0) {
          var tipMessage = window.$('#' + uid + 'tipMessage').val()
        } else {
          var tipMessage = ''
        }
        if (post.sender === window.config.userAddress) {
          new window.Popup().setTitle('NARCISSISM?')
          .addText('You just tried to tip yourself. You failed. Miserably.')
          .show()
        } else {
          PostBuilder.build(
            '5503',
            tipMessage,
            post.sender,
            parseInt(tipAmount),
            window.config.DEFAULT_FEE_PER_BYTE,
            post.txid
          )
          window.$('#' + uid + 'tipAmount').val('')
          window.Utilities.closePopup()
        }
      })
      
      window.$('body').append(tipWindow)
    }
    new InteractivePopup('#' + uid + 'tipWindow').show()
  }
}
