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
        new ComposeWindow()
      }
    }).render(),
    showBackButton: true
  })

  // get posts this user has written in the past
  TransactionManager.loadTransactionsByAddress(config.userAddress)


  // TODO modularize, clean this up a bit
  // get the user's name and display info
  NameManager.resolveFromAddress(config.userAddress).then((name) => {
    var nameHash = $('<img></img>')
    nameHash.attr('src', name.hashData)
    nameHash.attr('alt', 'Address: ' + name.address)
    nameHash.attr('title', 'Address: ' + name.address)
    nameHash.attr('class', 'UIInlineNameHash')
    $('#myName').text('')
    $('#myName').append('Hi, ')
    $('#myName').append(nameHash)
    $('#myName').append(name.displayName)
    $('#myName').append('!')
  })
}

window.onPostLoad = function (post) {
  // Only display posts sent by this user
  if (post.sender == config.userAddress.toString()) {
    post.render()
  }
}
