import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Waiter from './Waiter';
import Chef from './Chef';
import ReadyPedidoList from './PedidosReady';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/waiter">Waiter</Link>
            </li>
            <li>
              <Link to="/pedidosReady">Pedidos ready to deliver</Link>
            </li>
            <li>
              <Link to="/chef">Chef</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/chef">
            <Chef />
          </Route>
          <Route path="/waiter">
            <Waiter />
          </Route>
          <Route path="/pedidosReady">
            <ReadyPedidoList />
          </Route>
          <Route path="/">
            <Waiter />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
