window.pageInit = function () {

  // define a React component for the page
  class PostPage extends React.Component {
    render () {
      return (
        <div id="content">
          <div id="posts">
          </div>
        </div>
      )
    }
  }

  ReactDOM.render(<PostPage />, document.getElementById('app'))

  new NavigationMenu({
    pageTitle: 'Replies',
    pageIcon: './images/newusers_icon.svg',
    //rightButton: new ImageButton({
    //  text: 'New Post',
    //  image: './images/compose_icon.svg',
    //  onclick: () => {
    //    new CompositionWindow(window.topPost) // hacky
    //  }
    //}).render(),
    showBackButton: true
  })

  window.topPostTXID = Utilities.resolveGETParam('txid')
  new Transaction(window.topPostTXID, {
    loadChildren: true
  })
}
window.onPostLoad = function (post) {
  return new Promise((resolve, reject) => {
    if (post.txid === window.topPostTXID) {
      window.topPost = post
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
