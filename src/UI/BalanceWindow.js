/**
 * Balance Window
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * @file Defines and displays the Name Change Window
 */

export default class BalanceWindow {
  constructor () {
    if (window.$('#balanceWindow').length === 0) {
      var balanceWindow = window.$('<div></div>')
      balanceWindow.attr('id', 'balanceWindow')
      balanceWindow.attr('class', 'UIAlertWindow hidden')

      var balanceTitle = window.$('<h3></h3>')
      balanceTitle.attr('class', 'center-text')
      balanceTitle.text('YOUR UNITE ADDRESS')
      balanceWindow.append(balanceTitle)

      var balanceAddress = window.$('<p></p>')
      balanceAddress.attr('class', 'UIPanel mono center-text bold')
      balanceAddress.text('bitcoincash:' + window.config.userAddress)
      balanceWindow.append(balanceAddress)

      var balanceQR = window.$('<img></img>')
      balanceQR.attr('class', 'qrcode center')
      balanceQR.attr('alt', 'QR Code: bitcoincash:' + window.config.userAddress)
      balanceQR.attr(
        'src',
        'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=bitcoincash:' +
        window.config.userAddress
      )
      balanceWindow.append(balanceQR)

      var privateKeyDisplayButton = window.$('<button></button>')
      privateKeyDisplayButton.attr('id', 'privateKeyDisplayButton')
      privateKeyDisplayButton.attr('class', 'UIButton center w90 red')
      privateKeyDisplayButton.text('SHOW PRIVATE KEY')
      window.$(document).on('click', '#privateKeyDisplayButton', () => {
        new InteractivePopup('#privateKeyConfirmWindow').show()
      })
      balanceWindow.append(privateKeyDisplayButton)

      var privateKeyConfirmWindow = window.$('<div></div>')
      privateKeyConfirmWindow.attr('id', 'privateKeyConfirmWindow')
      privateKeyConfirmWindow.attr('class', 'UIAlertWindow hidden')

      var privateKeyConfirmTitle = window.$('<h3></h3>')
      privateKeyConfirmTitle.text('YOUR PRIVATE KEY')
      privateKeyConfirmTitle.attr('class', 'center-text')
      privateKeyConfirmWindow.append(privateKeyConfirmTitle)

      var privateKeyConfirmLabel = window.$('<p></p>')
      privateKeyConfirmLabel.html(`Never share your key with anyone. With this
        key, somebody would be able to <span class="red bold">HACK YOUR ACCOUNT
        AND STEAL YOUR MONEY.</span> To show your key, click the button below.
        <span class="red bold">Only do this if you know exactly what you are
        doing and understand the risks!</span>`)
      privateKeyConfirmWindow.append(privateKeyConfirmLabel)

      var privateKeyConfirmButton = window.$('<button></button>')
      privateKeyConfirmButton.attr('id', 'privateKeyConfirmButton')
      privateKeyConfirmButton.attr('class', 'UIButton center red w90')
      privateKeyConfirmButton.text('I UNDERSTAND')
      window.$(document).on('click', '#privateKeyConfirmButton', () => {
        new InteractivePopup('#privateKeyWindow').show()
      })
      privateKeyConfirmWindow.append(privateKeyConfirmButton)

      var privateKeyWindow = window.$('<div></div>')
      privateKeyWindow.attr('id', 'privateKeyWindow')
      privateKeyWindow.attr('class', 'UIAlertWindow hidden')

      var privateKeyTitle = window.$('<h3></h3>')
      privateKeyTitle.attr('class', 'center-text')
      privateKeyTitle.text('YOUR PRIVATE KEY')
      privateKeyWindow.append(privateKeyTitle)

      var privateKeyText = window.$('<p></p>')
      privateKeyText.attr('class', 'UIPanel red mono bold center-text')
      privateKeyText.text(window.config.userPrivateKey.toWIF())
      privateKeyWindow.append(privateKeyText)

      window.$('body').append(balanceWindow)
      window.$('body').append(privateKeyConfirmWindow)
      window.$('body').append(privateKeyWindow)
    }
    new InteractivePopup('#balanceWindow').show()
  }
}
