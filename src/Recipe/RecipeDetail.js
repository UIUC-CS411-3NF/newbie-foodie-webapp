import {
  Box, TextField, Dialog, Divider, IconButton, Typography, Button, Alert, AlertTitle,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import ReviewCard from './ReviewCard';
import IngredientCard from './IngredientCard';
import { deleteReview, getRecipeById, postReview } from '../features/recipe/recipeAPI';

const RecipeDetail = () => {
  const { rid } = useParams();
  const [recipe, setRecipe] = useState(null);
  const auth = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [postError, setPostError] = useState(false);
  const { control, handleSubmit, reset } = useForm();
  const [uploading, setUploading] = useState(false);
  const onSubmit = (data) => {
    const createReview = async () => {
      const payload = { ...data, recipe_id: rid };
      try {
        setUploading(true);
        const response = await postReview(payload);
        const p = await getRecipeById(rid);
        const recipe = p.data;
        console.log(recipe);

        setRecipe(recipe);
        setPostError(false);
        reset();
        handleDialogClose();
      } catch (err) {
        setPostError(true);
        console.log(err);
      }
      setUploading(false);
    };
    createReview();
  };
  useEffect(() => {
    const getRecipe = async () => {
      try {
        const p = await getRecipeById(rid);
        const recipe = p.data;
        setRecipe(recipe);
        console.log(recipe);
      } catch (err) {
        console.log(err);
      }
    };
    if (rid) {
      getRecipe();
    }
  }, [rid]);

  const handleDialogClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleOnDeleteClick = async (review) => {
    if (review.user_id == auth.user_id) {
      try {
        await deleteReview(review.user_review_recipe_id);
        const p = await getRecipeById(rid);
        const recipe = p.data;
        console.log(recipe);

        setRecipe(recipe);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    recipe != null
      ? (
        <Box
          sx={{
            width: '100%',
            padding: 3,
          }}
        >
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h3"
                sx={{ flex: 1 }}
              >
                {recipe.dish_name}
              </Typography>
              <Box>
                {/* <IconButton>
              <BookmarksOutlinedIcon />
            </IconButton> */}
                {auth.login
            && (
            <IconButton onClick={handleDialogClickOpen}>
              <CreateOutlinedIcon />
            </IconButton>
            )}
              </Box>
            </Box>
            <Typography variant="subtitle1">
              {dayjs(recipe.last_update_date).format('MMMM D, YYYY')}
            </Typography>
          </Box>
          <Box>
            <Rating name="half-rating-read" value={recipe.weightedRate} precision={0.1} readOnly />
          </Box>
          <Box>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h5">
                  Description
                </Typography>
                <Divider
                  sx={{
                    flex: 1,
                  }}
                />
              </Box>
              <Typography
                sx={{
                  mt: '8px',
                  mb: '8px',
                }}
                variant="body1"
              >
                {recipe.description}
              </Typography>
              <Typography
                sx={{
                  color: 'primary.dark',
                  mb: 4,
                }}
                variant="h5"
              >
                {`cooking time : ${recipe.cooking_time} min`}
              </Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h5">
                  Ingredients
                </Typography>
                <Divider
                  sx={{
                    flex: 1,
                  }}
                />
              </Box>
              <Box
                sx={{
                  ml: '90px',
                }}
              >
                {
              recipe.ingredients.map((ingredient) => (
                <IngredientCard
                  ingredient={{
                    name: ingredient.name,
                    amount: ingredient.amount,
                  }}
                />
              ))
            }
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h5">
                  Reviews
                </Typography>
                <Divider
                  sx={{
                    flex: 1,
                  }}
                />
              </Box>
              <Box>
                {
              recipe.reviews.map((review) => (
                <ReviewCard
                  review={review}
                  deleteButtonShow={false}
                  handleOnDeleteClick={() => handleOnDeleteClick(review)}
                />
              ))
            }
              </Box>
            </Box>
          </Box>
          <Dialog
            open={open}
            onClose={handleDialogClose}
          >
            <Box
              sx={{
                width: '600px',
                height: '360px',
                display: 'flex',
                padding: '18px',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h6">
                Review
              </Typography>
              <form
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name="rate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Rating {...field} size="large" />}
                />
                <Controller
                  name="comment"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="What did you like or dislike?"
                      multiline
                      required
                      minRows={8}
                      sx={{ width: '520px' }}
                      {...field}
                    />
                  )}
                />
                <Box
                  sx={{
                    pt: '2px',
                    width: '520px',
                    display: 'flex',
                    flexDirection: 'row-reverse',
                  }}
                >
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={handleDialogClose}
                    sx={{
                      ml: '2px',
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      ml: '2px',
                    }}
                  >
                    Summit
                  </Button>
                  {postError
                && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  Failed to comment —
                  {' '}
                  <strong>check it out!</strong>
                </Alert>
                )}
                </Box>
              </form>
            </Box>
          </Dialog>
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      )
  );
};

export default RecipeDetail;
