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
    // TODO modularize, externalize this
    var nameHash = $('<img></img>')
    nameHash.attr('src', user.name.calcHash())
    nameHash.attr('alt', 'Address: ' + user.name.address)
    nameHash.attr('title', 'Address: ' + user.name.address)
    nameHash.attr('class', 'UIInlineNameHash')
    $('#myName').text('')
    $('#myName').append('Hi, ')
    $('#myName').append(nameHash)
    $('#myName').append(user.name.displayName)
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
  // Only display posts sent by this user
  if (post.sender === window.currentUserAddress) {
    post.render()
  }
}
