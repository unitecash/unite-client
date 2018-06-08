window.pageInit = function () {
  $('#mybalance').on('click', () => {
    new InteractivePopup('#moreProfileInfo').show()
  })

  $('#changename').on('click', () => {
    new InteractivePopup('#changeNameDiv').show()
  })

  $('#settingsbutton').on('click', () => {
    new InteractivePopup('#settings').show()
  })

  $('#privKeyDisplayButton').on('click', () => {
    new InteractivePopup('#showKey').show()
  })

  $('#keyDisplay').on('click', () => {
    new InteractivePopup('#showPrivateKey').show()
  })

  // set address text
  $('#myaddress').text(config.userAddress)

  networkManager.getBalance(config.userAddress).then((balance) => {
    $('#mybalance').text('BALANCE: ' + balance + ' BCH')
  })

  // get posts this user has written in the past
  //TransactionManager.loadTransactionsByAddress(config.userAddress)

  // get the user's name and display italic
  NameManager.resolveFromAddress(config.userAddress).then((name) => {
    var nameHash = $('<img></img>')
    nameHash.attr('src', name.hashData)
    nameHash.attr('alt', 'True Address: ' + name.address)
    nameHash.attr('title', 'True Address: ' + name.address)
    nameHash.attr('class', 'UIInlineNameHash')
    $('#myName').text('')
    $('#myName').append('Hi, ')
    $('#myName').append(nameHash)
    $('#myName').append(name.displayName)
    $('#myName').append('!')
  })

  // display a QR code for deposit
  $('#myqrcode').attr(
    'src',
    'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' +
    config.userAddress
  )

  // set the private key text
  $('#privateKeyText').text(config.userPrivateKey.toWIF())
}

window.onPostLoad = function (post) {
  // Only display posts sent by this user
  if (post.sender == config.userAddress.toString()) {
    post.render()
  }
}
