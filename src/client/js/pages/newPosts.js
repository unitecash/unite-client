window.pageInit = function () {
  new NavigationMenu({
    pageTitle: 'New Posts',
    pageIcon: './images/newposts_icon.svg',
    rightButton: new ImageButton({
      text: 'New Post',
      image: './images/compose_icon.svg',
      onclick: () => {
        new CompositionWindow()
      }
    }).render()
  })

  networkManager.loadTransactionsByAddress(config.CENTRAL_CONTENT_ADDRESS,
  {
    loadChildren: false
  })
}
window.onPostLoad = function (post) {
  post.render()
}
