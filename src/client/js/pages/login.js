/**
 * Login Entry Point Script
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * This file provides the code to be executed on the login page.
 *
 * @file Provides an entry point for the login page.
 */

var fade = $('*:visible')
fade.hide()
fade.fadeIn('slow')

$(document).ready(() => {
  $('#user').focus()
  //$('#insightURL').val(config.randomInsightEndpoint())
  //$('#websockURL').val(config.randomInsightWebsocket())
  $('#loginform').on('submit', function (ev) {
    ev.preventDefault()
    // check if WIF was used for login
    if ($('#privatekeyfield').val().length > 5) { // logging in with WIF
      // TODO validate the provided private key
      sessionStorage.privateKey = $('#privatekeyfield').val()
      Utilities.redirect('profile.html')
    } else { // logging in with username and password
      if ($('#user').val().length < 1) {
        new ErrorBanner('Please enter a username').show()
      } else if ($('#pass').val().length < 12) { // [TODO]: validate this
        Messages.passwordSecurity()
      //} else if ($('#insightURL').val().length < 6) {
      //  new ErrorBanner('Is that Insight URL correct?').show()
      //} else if ($('#websockURL').val().length < 6) {
      //  new ErrorBanner('That WebSocket URL smells fishy...').show()
      } else {
        $('#loginbutton').val('PLEASE WAIT...')
        sessionStorage.privateKey = Utilities.privateKeyFromLoginCredentials (
          $('#user').val(),
          $('#pass').val()
        )
        Utilities.redirect('profile.html')
      }
    }
  })
  $('#signupButton').on('click', (ev) => {
    ev.preventDefault()
    Messages.signUp()
  })
  $('#advanced').on('click', function () {
    new InteractivePopup('#advancedwindow').show()
  })
})
