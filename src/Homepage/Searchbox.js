import React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { IconButton, InputBase } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';

const Searchbox = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
    }}
  >
    <Box
      sx={{
        borderRadius: 8,
        border: '1px solid grey',
        width: 360,
        display: 'flex',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search what you like to eat today!"
      />
      <IconButton type="submit" sx={{ p: '10px' }}>
        <SearchOutlined />
      </IconButton>
    </Box>
  </div>
);
export default Searchbox;
