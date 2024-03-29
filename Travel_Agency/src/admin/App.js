import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import passport from 'passport';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Проверка дали потребителят е автентифициран
    passport.authenticate('jwt', (err, user) => {
      if (err) {
        console.log(err);
      } else if (user) {
        setIsAuthenticated(true);
      }
    })(req, res, next);
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/admin/login" component={Login} />
        <Route exact path="/admin/dashboard" component={isAuthenticated ? Dashboard : Login} />
      </Switch>
    </Router>
  );
};

export default App;
