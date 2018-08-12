/**
 * Login Entry Point Script
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * This file provides the code to be executed on the login page.
 *
 * @file Provides an entry point for the login page.
 */

class LoginWindow extends React.Component {
  render () {
    return (
      <div>
        <form id="loginform">
        <img src="./images/banner.png" />
        <h2>We Stand Against Censorship</h2>
        <h5 className="text-center">Please Log In</h5>
        <input className="UITextField center w90" id="user" placeholder="Username..." />
        <input className="UITextField center w90" id="pass" placeholder="Password..." type="password" />
        <input className="UIButton center w90" type="submit" id="loginbutton" value="LOG IN" />
        <button type="button" className="UIButton center w90" id="signupButton">SIGN UP</button>
        <p className="text-center" id="advanced">Advanced...</p>
        <div className="UIAlertWindow hidden" id="advancedwindow">
        <p>Insight API Base URL</p>
        <input className="UITextField center w90" id="insightURL" placeholder="URL..." /><br/>
        <p>WebSocket API Endpoint</p>
        <input className="UITextField center w90" id="websockURL" placeholder="wss://..." /><br/>
        <p>Log In with Private Key (WIF)</p>
        <input className="UITextField center w90" id="privatekeyfield" placeholder="WIF Key..." /><br/>
        <input className="UIButton center w90" type="submit" id="loginbutton" value="LOG IN" />
        </div>
        </form>
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
