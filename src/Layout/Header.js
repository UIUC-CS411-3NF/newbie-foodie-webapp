import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { IconButton } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { signOutAsync } from '../features/auth/authSlice';

const Header = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handleOnClickLogo = () => {
    history.push('/');
  };

  const handleOnClickLogIn = () => {
    history.push('/login');
  };

  const handleOnClickSignUp = () => {
    history.push('/signup');
  };
  const handleOnClickProfile = () => {
    history.push('/profile');
  };

  const handleOnClickSignOut = () => {
    dispatch(signOutAsync());
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <div
            style={{ flexGrow: 1 }}
          >
            <Button
              color="inherit"
              onClick={handleOnClickLogo}
              variant="text"
            >
              Newbie Foodie
            </Button>
          </div>
          { !auth.login
                && (
                <>
                  <Button
                    color="inherit"
                    onClick={handleOnClickLogIn}
                  >
                    Login
                  </Button>
                  <Button
                    color="inherit"
                    onClick={handleOnClickSignUp}
                  >
                    Signup
                  </Button>
                </>
                )}
          {
                auth.login
                && (
                <>
                  <IconButton
                    color="inherit"
                    size="large"
                    aria-label="Account"
                    onClick={handleOnClickProfile}
                  >

                    <AccountBoxIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    size="large"
                    aria-label="Logout"
                    onClick={handleOnClickSignOut}
                  >

                    <LogoutOutlined />
                  </IconButton>
                </>
                )
            }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
