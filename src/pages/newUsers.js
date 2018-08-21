window.pageInit = function () {
  new NavigationMenu({
    pageTitle: 'New Users',
    pageIcon: './images/newusers_icon.svg',
    rightButton: new ImageButton({
      text: 'New Post',
      image: './images/compose_icon.svg',
      onclick: () => {
        new CompositionWindow()
      }
    }).render()
  })

  class NewUsersPage extends React.Component {
    render () {
      return (
        <div id="content" >
          <center>
            <h1>Not Yet Implemented</h1>
            <p>When complete, you will be able to view and interact with new
            users on this page, tipping their content and welcoming them to the
            platform.</p>
          </center>
          <div id="posts"></div>
        </div>
      )
    }
  }

  ReactDOM.render(<NewUsersPage />, document.getElementById('app'))
}
window.onPostLoad = function (post) {
  return new Promise((resolve, reject) => {
    resolve (false)
  })
}
