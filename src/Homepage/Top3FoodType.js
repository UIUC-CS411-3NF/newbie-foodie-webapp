import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { getTop3FoodTypeRecipesAsync } from '../features/recipe/recipeSlice';
import Stack from '@mui/material/Stack';
import { display } from '@mui/system';

const Top3FoodType = () => {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipe);
  useEffect(() => {
    dispatch(getTop3FoodTypeRecipesAsync(''));
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
    <h1>Top 3 Food Types</h1>
    <Stack
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }} 
      component="div"  direction="row" spacing={2}>
      {
        recipe.top3FoodType && recipe.top3FoodType.map((item) => (
          <div
            style={{
              paddingLeft: '32px',
              paddingRight: '32px',
              background: '#1776D2',
              border: 0,
              borderRadius: 3,
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
            }}  
          >
            <div
              style={{
                background: '#1776D2',
                border: 0,
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}  
            > {item.name} </div>
            <div> {item.numRecipe} recipes </div>
          </div>
        ))
      }
      </Stack>
    </div>
  );
};
export default Top3FoodType;