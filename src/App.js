import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

import  Home  from './pages/Home.js';
import  Login  from './pages/Login.js';
import  Register  from './pages/Register.js';

const App = () => (
  <BrowserRouter>
    <Switch >
      <Route exact path="/login" name="Login" component={Login} />
      <Route exact path="/register" name="Register" component={Register} />
      <Route path="/" name="Home" render={props => <Home {...props} />} />
    </Switch>
  </BrowserRouter>
);

export default App;
