/**
 * Settings window
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * @file Defines and displays the Settings window
 */

export default class SettingsWindow {
  constructor () {
    if ($('#settingsWindow').length === 0) {
      var settings = $('<div></div>')
      settings.attr('id', 'settingsWindow')
      settings.attr('class', 'UIAlertWindow hidden')

      var settingsTitle = $('<h3></h3>')
      settingsTitle.attr('class', 'center center-text')
      settingsTitle.attr('id', 'settingsTitle')
      settingsTitle.text('SETTINGS')
      settings.append(settingsTitle)

      var balanceButton = $('<button></button>')
      balanceButton.attr('class', 'UIButton center w90')
      balanceButton.attr('id', 'balanceButton')
      networkManager.getBalance(config.userAddress).then((balance) => {
        balanceButton.text('BALANCE: ' + balance + ' BCH')
        // this appends it to the div only after the balance is retrieved
        balanceButton.insertAfter('#settingsTitle')
      })
      $(document).on('click', '#balanceButton', () => {
        new BalanceWindow()
      })

      var changeNameButton = $('<button></button>')
      changeNameButton.attr('class', 'UIButton center w90')
      changeNameButton.attr('id', 'changeNameButton')
      changeNameButton.text('CHANGE NAME')
      settings.append(changeNameButton)
      $(document).on('click', '#changeNameButton', () => {
        new NameChangeWindow()
      })

      var soundsButton = $('<button></button>')
      soundsButton.attr('class', 'UIButton center w90')
      soundsButton.attr('id', 'soundsButton')
      soundsButton.text('SOUNDS')
      settings.append(soundsButton)
      $(document).on('click', '#soundsButton', () => {
        new SoundSettingsWindow()
      })

      var notificationsButton = $('<button></button>')
      notificationsButton.attr('class', 'UIButton center w90')
      notificationsButton.attr('id', 'notificationsButton')
      notificationsButton.text('NOTIFICATIONS')
      settings.append(notificationsButton)
      $(document).on('click', '#notificationsButton', () => {
        new NotificationSettingsWindow()
      })

      var logoutButton = $('<button></button>')
      logoutButton.attr('class', 'UIButton center w90')
      logoutButton.attr('id', 'logoutButton')
      logoutButton.text('SIGN OUT')
      settings.append(logoutButton)
      $(document).on('click', '#logoutButton', () => {
        Utilities.logOut()
      })

      $('body').append(settings)
    }
    new InteractivePopup('#settingsWindow').show()
  }
}
