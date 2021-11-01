import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignIn from '../User/SignIn';
import SignUp from '../User/SignUp';
import Homepage from '../Homepage/Homepage';
import Profile from '../User/Profile';

const Main = () => {
  const auth = useSelector((state) => state.auth);
  let routes;
  if (auth.login) {
    routes = (
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/">
          <Homepage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      {
        routes
    }
    </div>
  );
};

export default Main;
