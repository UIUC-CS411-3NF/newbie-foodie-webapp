import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import RecipeCard from '../Recipe/RecipeCard';
import { getUserRecipesAsync } from '../features/recipe/recipeSlice';

const UserRecipes = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleCreateClick = () => {
    history.push('/profile/recipe/create');
  };
  const recipe = useSelector((state) => state.recipe);
  console.log(recipe);

  useEffect(() => {
    dispatch(getUserRecipesAsync());
  }, []);

  const ShowAvatar = false;
  return (

    <div>
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
        <RecipeCard />
        <RecipeCard />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          padding: 8,
        }}
      >
        <Button
          onClick={handleCreateClick}
          variant="contained"
        >
          Create New Recipe
        </Button>
      </Box>
    </div>
  );
};
export default UserRecipes;
