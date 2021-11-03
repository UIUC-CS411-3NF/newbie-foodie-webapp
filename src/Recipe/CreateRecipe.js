import {
  Alert,
  Backdrop,
  Box,
  Button, CircularProgress, IconButton, Input, InputAdornment, MenuItem, Select, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import apiStatus from '../features/apiStatus';
import { createRecipeAsync } from '../features/recipe/recipeSlice';

const CreateRecipe = () => {
  const history = useHistory();
  const [myIngredients, setIngredients] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const { ingredients, status } = useSelector((state) => state.recipe);
  const onSubmit = (data) => {
    const {
      dish_name, description, cooking_time, ...other
    } = data;
    const ingredients = [];
    for (let i = 0; i < myIngredients.length; i++) {
      const ingredient = {};
      ingredient.ingredient_id = other[`ingredient${i}`];
      ingredient.amount = other[`ingredient_amount_${i}`];
      ingredients.push(ingredient);
    }
    console.log(ingredients);
    dispatch(createRecipeAsync({
      dish_name,
      description,
      cooking_time,
      ingredients,
    }));
  };
  const handleBackClick = () => {
    history.push('/profile/recipes');
  };
  console.log(ingredients);
  const handleOnAddIngredientClick = () => {
    setIngredients((prev) => {
      const newIngredient = prev.map((item) => item);
      newIngredient.push(prev.length);
      return newIngredient;
    });
  };
  const handleOnDeleteIngredientClick = () => {
    setIngredients((prev) => {
      const newIngredient = prev.filter((item) => item !== prev.length - 1);
      return newIngredient;
    });
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
          endAdornment={<InputAdornment position="end">Min</InputAdornment>}
          startAdornment={<InputAdornment position="start">Cooking Time</InputAdornment>}
          margin="normal"
          {...register('cooking_time')}
        />
        <Box
          sx={{
            mt: 2,
            mb: 4,
            ml: 2,
            mr: 2,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography variant="subtitle1">
              Add and Select Your Ingredients
            </Typography>
            <IconButton
              onClick={
                handleOnAddIngredientClick
              }
              color="primary"
            >
              <AddCircleOutlineIcon />
            </IconButton>
            <IconButton
              onClick={
                handleOnDeleteIngredientClick
              }
              color="error"
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </div>
          <>
            {
            myIngredients.map((item) => (
              <div
                key={item}
              >
                <Select
                  required
                  sx={{
                    minWidth: 120,
                    mr: 3,
                  }}
                  {...register(`ingredient${item}`)}
                >
                  {
                    ingredients && ingredients.map((ingredient) => (
                      <MenuItem
                        value={`${ingredient.ingredient_id}`}
                        key={ingredient.ingredient_id}
                      >
                        {ingredient.name}
                      </MenuItem>
                    ))
                  }
                </Select>
                <Input
                  required
                  type="number"
                  placeholder={3}
                  {...register(`ingredient_amount_${item}`)}
                />
              </div>
            ))
          }
          </>
        </Box>
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
