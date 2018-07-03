window.pageInit = function () {

  window.topPostTXID = Utilities.resolveGETParam('txid')
  new Transaction(window.topPostTXID).then((post) => {
    post.loadReplies()
    new NavigationMenu({
      pageTitle: 'Replies',
      pageIcon: './images/newusers_icon.svg',
      rightButton: new ImageButton({
        text: 'New Post',
        image: './images/compose_icon.svg',
        onclick: () => {
          new CompositionWindow(post)
        }
      }).render(),
      showBackButton: true
    })
  })
}
window.onPostLoad = function (post) {
  if (post.txid === window.topPostTXID) {
    post.render('#topPost')
  } else if (post.parentTXID === window.topPostTXID) {
    post.render('#replies')
  }
}
