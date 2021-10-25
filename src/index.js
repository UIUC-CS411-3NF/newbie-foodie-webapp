import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Box } from '@mui/material';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Main from './Layout/Main';
import { store } from './app/store';
import Header from './Layout/Header';
import Footer from './Layout/Footer';

ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
