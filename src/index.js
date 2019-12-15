/**
 * Unite Client Implementation
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * @file Provides an entry point for the application.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route
          path='/'
          render={props => <div {...props}>Hello World</div>}
        />
      </Switch>
    </Router>
   )
}
 
ReactDOM.render(App, document.getElementById('root'))

export default App