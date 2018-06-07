/**
 * User page logic
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * Defines the logic used by the page which displays user profiles.
 *
 * @file User page logic
 */

window.pageInit = function () {
  window.userAddress = Utilities.resolveGETParam('address')
  // should create window.user = new User(userAddress).then(() => { ... })
  get_posts(userAddress) // should be user.getPosts()

  // get the user's name and display italic
  /* get_name (userAddress).then(function(name) {
		// should be NamManager.resolveFromAddress(addr)
		userName = name
		$('#myName').html(name.hash + name.name)
		$('#headertitle').text(name.name)
	}) */
  // ^ should just be $('#myName').html(name.hash + user.displayName
}
window.onPostLoad = function (post) {
  // Only display posts sent by this user
  if (post.sender === user.address) {
    post.render()
  }
}
