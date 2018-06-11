window.pageInit = function () {

  $(document).on('click', '#settingsButton', () => {
    new SettingsWindow()
  })

  // get posts this user has written in the past
  TransactionManager.loadTransactionsByAddress(config.userAddress)

  // get the user's name and display italic
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
