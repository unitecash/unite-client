var appInit = function () {
  // get posts this user has written in the past
  get_posts(central_posts_address)
}
var handle_new_post = function (post) {
  render_post(post, 0, '#posts')
}
