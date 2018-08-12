/**
 * Balance Window
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * @file Defines and displays the Name Change Window
 */

export default class BalanceWindow {
  constructor () {
    if ($('#balanceWindow').length === 0) {
      var balanceWindow = $('<div></div>')
      balanceWindow.attr('id', 'balanceWindow')
      balanceWindow.attr('class', 'UIAlertWindow hidden')

      var balanceTitle = $('<h3></h3>')
      balanceTitle.attr('class', 'center-text')
      balanceTitle.text('YOUR UNITE ADDRESS')
      balanceWindow.append(balanceTitle)

      var balanceAddress = $('<p></p>')
      balanceAddress.attr('class', 'UIPanel mono center-text bold')
      balanceAddress.text('bitcoincash:' + config.userAddress)
      balanceWindow.append(balanceAddress)

      var balanceQR = $('<img></img>')
      balanceQR.attr('class', 'qrcode center')
      balanceQR.attr('alt', 'QR Code: bitcoincash:' + config.userAddress)
      balanceQR.attr(
        'src',
        'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=bitcoincash:' +
        config.userAddress
      )
      balanceWindow.append(balanceQR)

      var privateKeyDisplayButton = $('<button></button>')
      privateKeyDisplayButton.attr('id', 'privateKeyDisplayButton')
      privateKeyDisplayButton.attr('class', 'UIButton center w90 red')
      privateKeyDisplayButton.text('SHOW PRIVATE KEY')
      $(document).on('click', '#privateKeyDisplayButton', () => {
        new InteractivePopup('#privateKeyConfirmWindow').show()
      })
      balanceWindow.append(privateKeyDisplayButton)

      var privateKeyConfirmWindow = $('<div></div>')
      privateKeyConfirmWindow.attr('id', 'privateKeyConfirmWindow')
      privateKeyConfirmWindow.attr('class', 'UIAlertWindow hidden')

      var privateKeyConfirmTitle = $('<h3></h3>')
      privateKeyConfirmTitle.text('YOUR PRIVATE KEY')
      privateKeyConfirmTitle.attr('class', 'center-text')
      privateKeyConfirmWindow.append(privateKeyConfirmTitle)

      var privateKeyConfirmLabel = $('<p></p>')
      privateKeyConfirmLabel.html(`Never share your key with anyone. With this
        key, somebody would be able to <span class="red bold">HACK YOUR ACCOUNT
        AND STEAL YOUR MONEY.</span> To show your key, click the button below.
        <span class="red bold">Only do this if you know exactly what you are
        doing and understand the risks!</span>`)
      privateKeyConfirmWindow.append(privateKeyConfirmLabel)

      var privateKeyConfirmButton = $('<button></button>')
      privateKeyConfirmButton.attr('id', 'privateKeyConfirmButton')
      privateKeyConfirmButton.attr('class', 'UIButton center red w90')
      privateKeyConfirmButton.text('I UNDERSTAND')
      $(document).on('click', '#privateKeyConfirmButton', () => {
        new InteractivePopup('#privateKeyWindow').show()
      })
      privateKeyConfirmWindow.append(privateKeyConfirmButton)

      var privateKeyWindow = $('<div></div>')
      privateKeyWindow.attr('id', 'privateKeyWindow')
      privateKeyWindow.attr('class', 'UIAlertWindow hidden')

      var privateKeyTitle = $('<h3></h3>')
      privateKeyTitle.attr('class', 'center-text')
      privateKeyTitle.text('YOUR PRIVATE KEY')
      privateKeyWindow.append(privateKeyTitle)

      var privateKeyText = $('<p></p>')
      privateKeyText.attr('class', 'UIPanel red mono bold center-text')
      privateKeyText.text(config.userPrivateKey.toWIF())
      privateKeyWindow.append(privateKeyText)

      $('body').append(balanceWindow)
      $('body').append(privateKeyConfirmWindow)
      $('body').append(privateKeyWindow)
    }
    new InteractivePopup('#balanceWindow').show()
  }
}
