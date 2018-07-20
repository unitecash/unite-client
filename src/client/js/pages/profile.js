window.pageInit = () => {
  window.currentUserAddress = Utilities.resolveGETParam('addr')
  if (window.currentUserAddress === false) {
    window.currentUserAddress = config.userAddress
  }
  var leftButton = ''
  if (window.currentUserAddress === config.userAddress) {
    leftButton = new ImageButton({
      text: 'Settings',
      image: './images/settings_icon.svg',
      onclick: () => {
        new SettingsWindow()
      }
    }).render()
  }
  window.currentUser = new User(window.currentUserAddress).then((user) => {
    user.loadPosts()

    var inlineName = user.name.getInlineName()
    $('#myName').text('')
    $('#myName').append('Hi, ')
    $('#myName').append(inlineName)
    $('#myName').append('!')

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
      showBackButton: (window.currentUserAddress !== config.userAddress)
    })
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
