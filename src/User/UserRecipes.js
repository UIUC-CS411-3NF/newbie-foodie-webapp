import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import RecipeCard from '../Recipe/RecipeCard';
import { getUserRecipesAsync, resetStatus } from '../features/recipe/recipeSlice';

const UserRecipes = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleCreateClick = () => {
    history.push('/profile/recipe/create');
  };
  const recipe = useSelector((state) => state.recipe);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.user_id) {
      dispatch(getUserRecipesAsync(auth.user_id));
    }
  }, [auth.user_id]);

  useEffect(() => {
    dispatch(resetStatus());
  }, []);

  useEffect(() => {
    if (recipe.isNeedToReSearch) {
      dispatch(getUserRecipesAsync(auth.user_id));
    }
  }, [recipe.isNeedToReSearch]);
  console.log(recipe.recipes);
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
        {
          recipe.recipes && recipe.recipes.map((item) => (
            <RecipeCard
              key={item.recipe_id}
              allowedEdited
              recipe={item}
              showAvatar={false}
              user_id={auth.user_id}
            />
          ))
        }
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
