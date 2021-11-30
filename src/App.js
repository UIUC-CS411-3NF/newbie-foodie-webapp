import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Box } from '@mui/material';
import Main from './Layout/Main';
import { store } from './app/store';
import Header from './Layout/Header';
import Footer from './Layout/Footer';

function App() {
  return (
    <div className="App">
        <Provider store={store}>
        <BrowserRouter>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Header />
            <div
              style={{
                flexGrow: 1,
              }}
            >
              <Main />
            </div>
            <Footer />
          </Box>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
