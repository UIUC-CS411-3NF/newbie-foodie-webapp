import {
  Box,
  Button,
  Input,
  InputAdornment,
  TextField,
  Typography,
  Backdrop,
  CircularProgress,
  Alert,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import apiStatus from '../features/apiStatus';

const EditRecipe = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const { recipes, status } = useSelector((state) => state.recipe);
  const {
    register, handleSubmit, setValue, formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { rid } = useParams();
  const onSubmit = (data) => {
    console.log(data);
    // const payload = { ...data, recipe_id: rid };
    // dispatch(editRecipeAsync(payload));
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

  useEffect(() => {
    if (recipes) {
      const recipe = recipes.find((recipe) => recipe.recipe_id == rid);
      setValue('dish_name', recipe.dish_name);
      setValue('description', recipe.description);
      setValue('cooking_time', recipe.cooking_time);
    }
  }, [rid, recipes, setValue]);

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
        Edit
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
        sx={{ mb: 2 }}
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

export default EditRecipe;
