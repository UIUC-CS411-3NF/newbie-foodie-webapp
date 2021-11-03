import { Height, Home } from '@mui/icons-material';
import React from 'react';
import Background from '../resources/images/brooke-lark-wMzx2nBdeng-unsplash.jpg';
import Searchbox from './Searchbox';

const Homepage = () => (
  <div>
    <div
      style={{
        background: `url(${Background})`,
        width: '100%',
        height: 600,
        backgroundSize: 'cover',
      }}
    >
      <Searchbox />
    </div>

    <h1>Homepage</h1>
  </div>
);

export default Homepage;
