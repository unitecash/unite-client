window.pageInit = function () {
  new NavigationMenu({
    pageTitle: 'Popular',
    pageIcon: './images/popular_icon.svg',
    rightButton: new ImageButton({
      text: 'New Post',
      image: './images/compose_icon.svg',
      onclick: () => {
        new CompositionWindow()
      }
    }).render()
  })

  class PopularPage extends React.Component {
    render () {
      return (
        <div id="content" >
          <center>
            <h1>Not Yet Implemented</h1>
            <p>Once complete, the latest and greatest in popular content will
            appear here.</p>
          </center>
          <div id="posts"></div>
        </div>
      )
    }
  }

  ReactDOM.render(<PopularPage />, document.getElementById('app'))
}
window.onPostLoad = function (post) {
  return new Promise((resolve, reject) => {
    resolve (false)
  })
}
