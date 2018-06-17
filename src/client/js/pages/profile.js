window.pageInit = function () {
  new NavigationMenu({
    pageTitle: 'Profile',
    pageIcon: './images/profile_icon.svg',
    leftButton: new ImageButton({
      text: 'Settings',
      image: './images/settings_icon.svg',
      onclick: () => {
        new SettingsWindow()
      }
    }).render(),
    rightButton: new ImageButton({
      text: 'New Post',
      image: './images/compose_icon.svg',
      onclick: () => {
        new CompositionWindow()
      }
    }).render()
  })

  new User(config.userAddress).then((user) => {
    user.loadPosts()
    // TODO modularize, externalize this
    var nameHash = $('<img></img>')
    nameHash.attr('src', user.name.hashData)
    nameHash.attr('alt', 'Address: ' + user.name.address)
    nameHash.attr('title', 'Address: ' + user.name.address)
    nameHash.attr('class', 'UIInlineNameHash')
    $('#myName').text('')
    $('#myName').append('Hi, ')
    $('#myName').append(nameHash)
    $('#myName').append(user.name.displayName)
    $('#myName').append('!')
  })
}

window.onPostLoad = function (post) {
  // Only display posts sent by this user
  if (post.sender == config.userAddress.toString()) {
    post.render()
  }
}
