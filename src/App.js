import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Topbar from './components/Topbar/Topbar.jsx';
import Home from './Pages/Home/Home.jsx';


const App = () => {
  return (
    <>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        
      </Switch>
    </>

  )
}

export default App
