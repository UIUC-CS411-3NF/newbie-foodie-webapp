import { Height, Home } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Background from '../resources/images/brooke-lark-wMzx2nBdeng-unsplash.jpg';
import Searchbox from './Searchbox';
import RecipeCard from '../Recipe/RecipeCard';
import { getDishNameRecipesAsync, resetStatus } from '../features/recipe/recipeSlice';
import AdvanceSearchPopper from './AdvanceSearchPopper';

const Homepage = () => {
  const recipe = useSelector((state) => state.recipe);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDishNameRecipesAsync(''));
  }, []);

  return (
    <div>
      <div
        style={{
          background: `url(${Background})`,
          width: '100%',
          height: 600,
          backgroundSize: 'cover',
        }}
      >
        <Searchbox />
        <AdvanceSearchPopper />
      </div>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          alignItems: 'center',
          p: 1,
          m: 1,
        }}
      >
        {
          recipe.allRecipes && recipe.allRecipes.map((item) => (
            <RecipeCard
              key={item.recipe_id}
              allowedEdited={false}
              recipe={item}
              showAvatar={false}
            />
          ))
        }
      </Box>
    </div>
  );
};

export default Homepage;
