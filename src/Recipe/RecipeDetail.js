import {
  Box, TextField, Dialog, Divider, IconButton, Typography, Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Controller, useForm } from 'react-hook-form';
import ReviewCard from './ReviewCard';
import IngredientCard from './IngredientCard';

const RecipeDetail = () => {
  const { rid } = useParams();
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleDialogClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
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
            {`Recipe Name  ${rid}`}
          </Typography>
          <Box>
            <IconButton>
              <BookmarksOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleDialogClickOpen}>
              <CreateOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box>
        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
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
          <Typography variant="body1">
            Tempor consectetur tempor nisi proident id. Amet sit qui ipsum consequat do quis consectetur exercitation cupidatat. Sit mollit eu ipsum ipsum magna consectetur nostrud nostrud qui cillum. Veniam in dolore occaecat ea enim. Tempor deserunt fugiat duis nostrud deserunt deserunt eu consequat duis minim excepteur commodo pariatur consectetur. Reprehenderit sit in cillum anim.
          </Typography>
          <Typography
            sx={{
              color: 'primary.dark',
              mb: 4,
            }}
            variant="h5"
          >
            cooking time : 15 min
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
            <IngredientCard
              ingredient={{
                name: 'Apple',
                amount: 4,
              }}
            />
            <IngredientCard
              ingredient={{
                name: 'Apple',
                amount: 4,
              }}
            />
            <IngredientCard
              ingredient={{
                name: 'Apple',
                amount: 4,
              }}
            />
            <IngredientCard
              ingredient={{
                name: 'Apple',
                amount: 4,
              }}
            />
            <IngredientCard
              ingredient={{
                name: 'Apple',
                amount: 4,
              }}
            />
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
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
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
              name="rating"
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
            </Box>
          </form>
        </Box>
      </Dialog>
    </Box>
  );
};

export default RecipeDetail;
