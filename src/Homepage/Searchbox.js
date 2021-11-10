import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { IconButton, InputBase } from '@mui/material';
import { SearchOutlined, SettingsOverscanOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { getDishNameRecipesAsync } from '../features/recipe/recipeSlice';

const Searchbox = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(getDishNameRecipesAsync(keyword));
  };

  return (
    <div
      style={{
        width: '100%',
        height: '50%',
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
          onChange={(e) => (setKeyword(e.target.value))}
        />
        <IconButton
          type="submit"
          sx={{ p: '10px' }}
          onClick={handleSearch}
        >
          <SearchOutlined />
        </IconButton>
      </Box>
    </div>
  );
};
export default Searchbox;
