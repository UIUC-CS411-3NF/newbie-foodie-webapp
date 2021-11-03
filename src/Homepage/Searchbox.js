import React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { flexbox } from '@mui/system';

const Searchbox = () => (
  <div
  style={{
    width: '100%',
    height: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  }}
  >
  <Stack spacing={2} sx={{ width: '40%', }}>
  <Autocomplete
  id="homepage-searchbox"
  options={top100Films.map((option) => option.title)}
  renderInput={(params) => (
    <TextField
    {...params}
    label="Search what you like to eat Today!"
    InputProps={{
      ...params.InputProps,
      type: 'search',
    }}
    />
    )}
    />
    </Stack>
    </div>
    
    );
    
    const top100Films = [
      { title: 'The Shawshank Redemption'},
      { title: 'The Godfather'},
      { title: 'Monty Python and the Holy Grail'},
    ];
    
    export default Searchbox;
    