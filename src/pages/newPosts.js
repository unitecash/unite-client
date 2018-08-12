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

  class NewPpstsPage extends React.Component {
    render () {
      return (
        <div className="content">
        <div id="posts"></div>
        </div>
      )
    }
  }

  networkManager.loadTransactionsByAddress(config.CENTRAL_CONTENT_ADDRESS,
  {
    loadChildren: false
  })
}
window.onPostLoad = function (post) {
  return new Promise((resolve, reject) => {
    post.init().then((result) => {
      resolve (result)
    })
  })
}