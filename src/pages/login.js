/**
 * Login Entry Point Script
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * This file provides the code to be executed on the login page.
 *
 * @file Provides an entry point for the login page.
 */

require('./../images/banner.png')

class LoginWindow extends React.Component {
  render () {
    return (
      <div id="content">
        <center>
        <img className="center w50" src="./images/banner.png" />
        <h2>We Stand Against Censorship</h2>
        <h5 className="text-center">Please Log In</h5>
        <form id="loginform">
          <input className="UITextField center w90" id="user" placeholder="Username..." />
          <input className="UITextField center w90" id="pass" placeholder="Password..." type="password" />
          <button className="UIButton center w90" type="submit" id="loginbutton">LOG IN</button>
        </form>
        <button type="button" className="UIButton center w90" id="signupButton">SIGN UP</button>
        <p className="text-center" id="advanced">Advanced...</p>
        <div className="UIAlertWindow hidden" id="advancedwindow">
        <h1>Advanced Options</h1>
        <h2>Log In with Private Key (WIF)</h2>
        <input className="UITextField center w90" id="privatekeyfield" placeholder="WIF Key..." /><br/>
        <button className="UIButton center w90" type="submit" onclick="$('#loginbutton').click()">LOG IN</button>
        </div>
        </center>
      </div>
    )
  }
}

$(document).ready(() => {

  ReactDOM.render(<LoginWindow />, document.getElementById('app'))

  $('#user').focus()
  //$('#insightURL').val(config.randomInsightEndpoint())
  //$('#websockURL').val(config.randomInsightWebsocket())
  $('#loginform').on('submit', function (ev) {
    ev.preventDefault()
    $('#loginbutton').innerHTML = 'PLEASE WAIT...'
    // check if WIF was used for login
    if ($('#privatekeyfield').val().length > 5) { // logging in with WIF
      // TODO validate the provided private key
      sessionStorage.privateKey = $('#privatekeyfield').val()
      Utilities.redirect('newposts.html')
    } else { // logging in with username and password
      if ($('#user').val().length < 1) {
        new ErrorBanner('Please enter a username').show()
        $('#loginbutton').innerHTML = 'LOG IN'
      } else if ($('#pass').val().length < 12) { // [TODO]: validate this
        Messages.passwordSecurity()
        $('#loginbutton').innerHTML = 'LOG IN'
      //} else if ($('#insightURL').val().length < 6) {
      //  new ErrorBanner('Is that Insight URL correct?').show()
      //} else if ($('#websockURL').val().length < 6) {
      //  new ErrorBanner('That WebSocket URL smells fishy...').show()
      } else {
        sessionStorage.privateKey = Utilities.privateKeyFromLoginCredentials (
          $('#user').val(),
          $('#pass').val()
        )
        Utilities.redirect('newposts.html')
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
