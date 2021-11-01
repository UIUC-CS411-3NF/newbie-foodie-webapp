import {
  Box,
  Button, Input, InputAdornment, TextField,
} from '@mui/material';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createRecipeAsync } from '../features/recipe/recipeSlice';

const CreateRecipe = () => {
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(createRecipeAsync(data));
  };
  const handleBackClick = () => {
    history.push('/profile/recipes');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '18px',
      }}
    >
      <form
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          required
          label="Dish Name"
          placeholder="Pizza"
          margin="normal"
          {...register('dish_name')}
        />
        <TextField
          required
          label="Description"
          multiline
          minRows={4}
          maxRows={12}
          margin="normal"
          {...register('description')}
        />
        <Input
          required
          label="Cooking Time"
          type="number"
          endAdornment={<InputAdornment position="end">min</InputAdornment>}
          margin="normal"
          {...register('cooking_time')}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mb: 2 }}
        >
          SAVE
        </Button>
      </form>

      <Button
        fullWidth
        onClick={handleBackClick}
        color="error"
        variant="outlined"
      >
        Cancel
      </Button>
    </Box>
  );
};

export default CreateRecipe;
