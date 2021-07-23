import './App.css'
import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom'
import FullNav from './organisms/FullNav'
import Home from './pages/Home'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import EngineerPage from './pages/EngineerPage'

import { auth } from './firebase/firebase.utils'
import UserContext from './context/UserContext'

export const App = () => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    })
  }, [currentUser])

  return (

    <Router>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <FullNav />
        <Switch>
          <Route path="/" component={Home} exact />

          <Route
            exact
            path="/sign-in"
            render={() => (currentUser
              ? (
                <Redirect to="/" />)
              : (<SignInPage />))}
          />
          <Route path="/sign-up" component={SignUpPage} exact />
          <Route
            exact
            path="/engineer"
            render={() => (!currentUser
              ? (
                <Redirect to="/sign-in" />)
              : (<EngineerPage />))}
          />
        </Switch>
      </UserContext.Provider>
    </Router>

  )
}

export default App
