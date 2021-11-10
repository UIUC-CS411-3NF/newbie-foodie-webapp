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
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import apiStatus from '../features/apiStatus';
import { editRecipeAsync } from '../features/recipe/recipeSlice';

const EditRecipe = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const [myIngredients, setIngredients] = useState([]);
  const { ingredients, recipes, status } = useSelector((state) => state.recipe);
  const {
    control, register, handleSubmit, setValue, formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { rid } = useParams();
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
    dispatch(editRecipeAsync({
      dish_name,
      description,
      cooking_time,
      ingredients,
      recipe_id: rid,
    }));
  };
  const handleBackClick = () => {
    history.push('/profile/recipes');
  };

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

  useEffect(() => {
    if (recipes) {
      const recipe = recipes.find((recipe) => recipe.recipe_id == rid);
      setValue('dish_name', recipe.dish_name);
      setValue('description', recipe.description);
      setValue('cooking_time', recipe.cooking_time);
      recipe.ingredients.forEach((ingredient, index) => {
        setValue(`ingredient${index}`, ingredient.ingredient_id);
        setValue(`ingredient_amount_${index}`, ingredient.amount);
      });
      setIngredients(recipe.ingredients.map((item, index) => index));
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
        <Controller
          name="dish_name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dish Name"
              placeholder="Pizza"
              margin="normal"
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              margin="normal"
              multiline
              minRows={4}
              maxRows={12}
            />
          )}
        />
        <Controller
          name="cooking_time"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              {...field}
              required
              label="Cooking Time"
              type="number"
              endAdornment={<InputAdornment position="end">Min</InputAdornment>}
              startAdornment={<InputAdornment position="start">Cooking Time</InputAdornment>}
              margin="normal"
            />
          )}
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

                <Controller
                  name={`ingredient${item}`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      sx={{
                        minWidth: 120,
                        mr: 3,
                      }}
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
                  )}
                />
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
