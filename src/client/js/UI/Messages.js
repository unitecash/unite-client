/**
 * Messages
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * Defines the content of messages to be displayed to the user.
 *
 * @file Defines the Messages class.
 */

export default class Messages {

  static notEnoughFunds () {
    new Popup().setTitle('ACCOUNT BALANCE')
    .addText('<p>Check that you\'ve funded your account before posting!</p>')
    .addText('<p>We\'re working on a way to fund new users\' posts, it\'ll be ')
    .addText('out soon.</p><p>In the meantime, here are some ways to fund ')
    .addText('your account: </p>')
    .addText('<ul><li>Ask a friend to send you some Bitcoin Cash to your ')
    .addText('Unite.cash address</li>')
    .addText('<li>You can get some from the free.bitcoin.com faucet</li>')
    .addText('<li>You can trade any cryptocurrency for Bitcoin Cash on ')
    .addText('shapeshift.io</li>')
    .addText('<li>You can be tipped on sites like yours.org, Discord, ')
    .addText('or Reddit (r/btc)</li>')
    .addText('<li>You can buy some on sites like coinbase.com or ')
    .addText('kraken.com</li></ul>')
    .addText('<p>Your Unite.cash Address: </p>')
    .addText('')
    .show()
  }

  static broadcastFailure (hexdump) {
    new Popup().setTitle('BROADCAST FAILURE')
    .addText('Looks like this action was rejected by tne network for some ')
    .addText('reason... Please give this to a developer so they can have a ')
    .addText('look, or post it on Unite, or somewhere we\'ll see it.<br/><br/>')
    .addText('This is vary important to us, because it just ruined your ')
    .addText('experience. <div class="UIPanel mono">' + hexdump + '</div>')
    .show()
  }

  static signUp () {
    new Popup().setTitle('NO NEED TO SIGN UP WITH UNITE!')
		.addText(`<p>
			Just enter a unique username and a secure password to create
			your profile!
		</p>
		<p>
			Unite has no central authority. That means nobody can stop
			you from creating an account, and there is nobody to "sign up"
			with.
		</p>`)
		.show()
  }

  static tempCharLimit (chars) {
    new Popup()
    .addText('There is a temporary limit of '+chars+' characters for ')
    .addText('all posts. This will be removed soon. We apologize for the ')
    .addText('inconvenience.')
    .show()
  }

}
