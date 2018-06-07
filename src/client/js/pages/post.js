// some global vars for this script
var topPostTXID = Utilities.resolveGETParam('post')
var topPost
window.pageInit = function () {
  get_post(topPostTXID).then(function (post) {
    topPost = post
    get_posts(topPost.sender)
    render_post(post, 0, '#topPost')
  })
}
window.onPostLoad = function (post) {
  if (post.parent == topPost.sender && (post.type == 5503 || post.type == 5505)) {
    post.render()
  }
}
