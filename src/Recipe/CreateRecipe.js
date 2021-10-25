import {
  Button, Input, InputAdornment, TextField,
} from '@mui/material';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createRecipeAsync } from '../features/recipe/recipeSlice';

const CreateRecipe = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);
    // console.log(typeof(data.cooking_time));
    dispatch(createRecipeAsync(data));
  };
  return (
    <div>
      <form
        style={{
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          padding: 8,
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
          sx={{ mt: 3, mb: 2 }}
        >
          SAVE
        </Button>
      </form>
    </div>
  );
};

export default CreateRecipe;
