import {
  Avatar, Box, Button, Tab, Tabs,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Switch, Route } from 'react-router-dom';
import CreateRecipe from '../Recipe/CreateRecipe';
import EditRecipe from '../Recipe/EditRecipe';
import UserRecipes from './UserRecipes';

const Profile = () => {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const handleCreateClick = () => {
    history.push('/profile/recipe/create');
  };
  const [indexValue, setIndexValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setIndexValue(newValue);
  };

  useEffect(() => {
    switch (indexValue) {
      case 0:
        history.push('/profile');
        break;
      case 1:
        history.push('/profile/recipes');
        break;
      default:
        history.push('/profile');
    }
  }, [indexValue]);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px',
          }}
        >
          <Avatar
            sx={{
              width: 128,
              height: 128,
              fontSize: 45,
            }}
          >
            {auth.username && auth.username[0]}
          </Avatar>
          <h1>{auth.username}</h1>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            flexGrow: 1,
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '16px' }}>
            <Tabs value={indexValue} onChange={handleTabChange} aria-label="basic tabs example">
              <Tab label="My Profile" />
              <Tab label="My Recipes" />
            </Tabs>
          </Box>

          <Switch>
            <Route path="/profile/recipe/create" exact>
              <CreateRecipe />
            </Route>
            <Route path="/profile/recipe/edit/:rid" exact>
              <EditRecipe />
            </Route>
            <Route path="/profile/recipes" exact>
              <UserRecipes />
            </Route>
          </Switch>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
