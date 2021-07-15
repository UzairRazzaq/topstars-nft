import './App.css';
import React from "react";
import Navbar from './adapters/Navbar';
import Minter from './pages/Minter'
import About from './pages/about';
import Home from './pages/home';
import Product from './pages/Product'
import NftState from './pages/nftState';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-light bg-light justify-content-between sticky">
          <div className="navbar-brand">
            <Link to="/" className="mr-3 color-black">Home</Link>
            <Link to="/mint" className="mr-3 color-black">Mint</Link>
            <Link to="/about" className="mr-3 color-black">About</Link>
            <Link to="/nftState" className="mr-3 color-black">Sale/Bid</Link>
          </div>
          <Navbar></Navbar>
        </nav>

        <Switch>
          <Route exact path="/product/:id">
            <Product />
          </Route>
          <Route path="/mint">
            <Mint />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/nftState">
            <NftState />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Mint() {
  return <Minter></Minter>;
}