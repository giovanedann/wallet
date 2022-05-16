import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Wallet, Login } from './pages';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={ Login }
      />
      <Route
        exact
        path="/user-wallet"
        component={ (props) => <Wallet { ...props } /> }
      />
    </Switch>
  );
}

export default App;
