import {
  Alert,
  Backdrop,
  Box,
  Button, CircularProgress, Input, InputAdornment, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import apiStatus from '../features/apiStatus';
import { createRecipeAsync } from '../features/recipe/recipeSlice';

const CreateRecipe = () => {
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const status = useSelector((state) => state.recipe.status);
  const onSubmit = (data) => {
    dispatch(createRecipeAsync(data));
  };
  const handleBackClick = () => {
    history.push('/profile/recipes');
  };

  useEffect(() => {
    if (status === apiStatus.successful) {
      setOpen(false);
      history.push('/profile/recipes');
    } else if (status === apiStatus.pending) {
      setOpen(true);
    } else if (status === apiStatus.failed) {
      setOpen(false);
      setFailed(true);
    }
  }, [status]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '18px',
      }}
    >
      <Typography variant="h6">
        Create
      </Typography>
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
      <Backdrop
        open={open}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {failed && <Alert severity="error">Failed to create!!!</Alert>}
    </Box>
  );
};

export default CreateRecipe;
