import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';
import SignIn from '../User/SignIn';
import SignUp from '../User/SignUp';
import Homepage from '../Homepage/Homepage';
import Profile from '../User/Profile';
import { verifyAsync } from '../features/auth/authSlice';
import { getIngredientsAsync } from '../features/recipe/recipeSlice';

const Main = () => {
  const auth = useSelector((state) => state.auth);
  const recipe = useSelector((state) => state.recipe);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyAsync());
    dispatch(getIngredientsAsync());
  }, []);
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
  } else if (auth.login === false) {
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
  } else {
    routes = (
      <Backdrop
        open
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
