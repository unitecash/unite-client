window.pageInit = () => {

  // extract the target user's address from the URL string or use current user
  window.currentUserAddress = window.Utilities.resolveGETParam('addr')
  if (window.currentUserAddress === false) {
    window.currentUserAddress = window.config.userAddress
  }

  // show the settings button if the profile is the logged-in user
  var leftButton = ''
  if (window.currentUserAddress === window.config.userAddress) {
    leftButton = new ImageButton({
      text: 'Settings',
      image: './images/settings_icon.svg',
      onclick: () => {
        new SettingsWindow()
      }
    }).render()
  }

  // create the navigation menu
  new NavigationMenu({
    pageTitle: 'Profile',
    pageIcon: './images/profile_icon.svg',
    leftButton: leftButton,
    rightButton: new ImageButton({
      text: 'New Post',
      image: './images/compose_icon.svg',
      onclick: () => {
        new CompositionWindow()
      }
    }).render(),
    showBackButton: (window.currentUserAddress !== window.config.userAddress)
  })

  // define a React component for the page
  class ProfilePage extends React.Component {
    render () {
      return (
        <div id="content">
          <div className="UIPanel center center-text">
            <img id="profileImage" src="./images/unite_icon.svg" className="ProfileImage center" />
            <p id="myName">loading...</p>
            <p id="profileText"><i>"Some profound text goes here..."</i></p>
          </div>
          <div id="posts">
          </div>
        </div>
      )
    }
  }

  ReactDOM.render(<ProfilePage />, document.getElementById('app'))

  // create a user and load their properties into the page
  window.currentUser = new User(window.currentUserAddress).then((user) => {
    user.loadPosts()

    var inlineName = user.name.getInlineName()
    window.$('#myName').text('')
    window.$('#myName').append(inlineName)

  })
}

window.onPostLoad = function (post) {
  return new Promise((resolve, reject) => {
    // Only display posts sent by this user
    if (post.sender === window.currentUserAddress) {
      post.init().then((result) => {
        resolve (result)
      })
    } else {
      resolve (false)
    }
  })
}
