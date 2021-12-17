import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Topbar from './components/Topbar/Topbar.jsx';
import Home from './Pages/Home/Home.jsx';
import "./App.css";
import Explore from './Pages/Explore/Explore.jsx';
import Collection from './Pages/Collection/Collection.jsx';
import CreateNFT from './Pages/CreateNFT/CreateNFT.jsx';

const App = () => {
  return (
    <>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/explore">
          <Explore/>
        </Route>
        <Route exact path="/my-collection">
          <Collection/>
        </Route>
        <Route exact path="/create-nft">
          <CreateNFT/>
        </Route>
      </Switch>
    </>

  )
}

export default App
