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
import Popup from './Popup';
import apiStatus from '../features/apiStatus';
import { getAdvSQLOneRecipesAsync, getAdvSQLTwoRecipesAsync } from '../features/recipe/recipeSlice';

function AdvanceSearchPopper() {
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();
  const [myIngredients, setIngredients] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const { ingredients, status } = useSelector((state) => state.recipe);
  const onSubmit = (data) => {
    const {
      cooking_time, rate, ...other
    } = data;
    const ingredients = [];

    for (let i = 0; i < myIngredients.length; i++) {
      const ingredient = {};
      ingredient.ingredient_id = other[`ingredient${i}`];
      ingredient.amount = other[`ingredient_amount_${i}`];
      ingredients.push(ingredient);
    }
    if (ingredients.length) {
      if (ingredients[0].ingredient_id == '-1') {
        dispatch(getAdvSQLOneRecipesAsync({
          cooking_time,
          ingredient_amount: ingredients[0].amount,
        }));
      }
    } else if (cooking_time) {
      dispatch(getAdvSQLOneRecipesAsync({
        cooking_time,
        ingredient_amount: '',
      }));
    } else if (rate) {
      dispatch(getAdvSQLTwoRecipesAsync(rate));
    }
    setIsOpen(!isOpen);
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
    } else if (status === apiStatus.pending) {
      setOpen(true);
    } else if (status === apiStatus.failed) {
      setOpen(false);
      setFailed(true);
    }
  }, [status]);

  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <input
        type="button"
        value="Advanced Search"
        onClick={togglePopup}
      />
      {isOpen && (
      <Popup
        content={(
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '18px',
            }}
          >
            <Typography variant="h6">
              Advanced Query
            </Typography>
            <form
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                // required
                label="Cooking Time"
                type="number"
                endAdornment={<InputAdornment position="end">Min</InputAdornment>}
                startAdornment={<InputAdornment position="start">Cooking Time</InputAdornment>}
                // margin="normal"
                {...register('cooking_time')}
              />
              <Input
                // required
                label="Rate"
                type="number"
                endAdornment={<InputAdornment position="end">Min</InputAdornment>}
                startAdornment={<InputAdornment position="start">Rate</InputAdornment>}
                // margin="normal"
                {...register('rate')}
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
                  // required
                  sx={{
                    minWidth: 120,
                    mr: 3,
                  }}
                  {...register(`ingredient${item}`)}
                >
                  {
                    [
                      <MenuItem
                        value="-1"
                        key={-1}
                      >
                        All
                      </MenuItem>,
                      ...(ingredients && ingredients.map((ingredient) => (
                        <MenuItem
                          value={`${ingredient.ingredient_id}`}
                          key={ingredient.ingredient_id}
                        >
                          {ingredient.name}
                        </MenuItem>
                      ))),
                    ]
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

          </Box>
        )}
        handleClose={togglePopup}
      />
      )}
    </div>
  );
}

export default AdvanceSearchPopper;
