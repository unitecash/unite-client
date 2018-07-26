window.pageInit = function () {

  window.topPostTXID = Utilities.resolveGETParam('txid')
  new Transaction(window.topPostTXID, {
    loadChildren: true
  }).then((post) => {
    //post.loadReplies()
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
  return new Promise((resolve, reject) => {

    if (post.type == 5505) {
      console.log('post 5505!', post)
    }

    if (post.txid === window.topPostTXID) {
      post.init().then((result) => {
        resolve (result)
      })
    }else if (post.parentTXID !== undefined) {
      if ( $('#' + post.parentTXID.substr(0, 16)).length === 1) {
        post.init().then((result) => {
          resolve (result)
        })
      }
    } else {
      resolve (false)
    }
  })
}
