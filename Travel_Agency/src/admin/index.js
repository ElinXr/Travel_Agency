import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/admin/login" component={Login} />
      <Route exact path="/admin/dashboard" component={Dashboard} />
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));