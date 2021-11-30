import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { getTop3FoodTypeRecipesAsync } from '../features/recipe/recipeSlice';
import Stack from '@mui/material/Stack';

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
    <Stack component="div"  direction="row" spacing={2}>
      {/* {
        recipe.top3FoodType && recipe.top3FoodType.map((item) => (
          <h2>{item.foodtype_name}, {item.count}</h2>
        ))
      } */}
      <div
      style={{
        width: '30%',
        height: '50%',
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
      }}
      >Chicken
      </div>
      <div
      style={{
        width: '30%',
        height: '50%',
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
      }}
      >Chicken
      </div>
      <div
      style={{
        width: '30%',
        height: '50%',
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
      }}
      >Chicken
      </div>
      </Stack>
    </div>
  );
};
export default Top3FoodType;