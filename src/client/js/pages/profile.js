var appInit = function () {
  $('#mybalance').on('click', function () {
    display_html_alert('#moreProfileInfo')
  })
  $('#changename').on('click', function () {
    display_html_alert('#changeNameDiv')
  })
  $('#settingsbutton').on('click', function () {
    display_html_alert('#settings')
  })

  // set address text
  $('#myaddress').text(bchaddr.toCashAddress(address.toString()))

  // get address balance
  // TODO get_balance(addr)
  $.ajax({
    type: 'GET',
    url: insightBaseURL + 'addr/' + address.toString(),
    success: function (data) {
      $('#mybalance').text('BALANCE: ' + data.balance + ' BCH')
    }
  })

  // get posts this user has written in the past
  get_posts(address.toString())

  // get the user's name and display italic
  get_name(address.toString()).then(function (name) {
    myName = name
    $('#myName').html('Hi, ' + myName.hash + myName.name + '!')
  })

  // display a QR code for deposit
  $('#myqrcode').attr('src', 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' + bchaddr.toCashAddress(address.toString()))

  // set the private key text
  $('#privateKeyText').text(privateKey.toWIF())
}
var handle_new_post = function (post) {
  // Only display posts sent by this user
  if (post.sender == address.toString()) {
    render_post(post, post.isLive, '#posts')
  }
}
