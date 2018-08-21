window.pageInit = function () {
  new NavigationMenu({
    pageTitle: 'Feed',
    pageIcon: './images/feed_icon.svg',
    rightButton: new ImageButton({
      text: 'New Post',
      image: './images/compose_icon.svg',
      onclick: () => {
        new CompositionWindow()
      }
    }).render()
  })

  class FeedPage extends React.Component {
    render () {
      return (
        <div id="content" >
          <center>
            <h1>Not Yet Implemented</h1>
            <p>When complete, you will be able to see the content you care
            about from the Feed page.</p>
          </center>
          <div id="posts"></div>
        </div>
      )
    }
  }

  ReactDOM.render(<FeedPage />, document.getElementById('app'))
}
window.onPostLoad = function (post) {
  return new Promise((resolve, reject) => {
    resolve (false)
  })
}
