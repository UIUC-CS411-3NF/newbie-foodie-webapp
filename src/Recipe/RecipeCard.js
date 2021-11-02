import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteRecipeAsync } from '../features/recipe/recipeSlice';

const RecipeCard = ({
  showAvatar,
  user_id,
  recipe,
  allowedEdited,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleOnEditClick = (rid) => {
    history.push(`/profile/recipe/edit/${rid}`);
  };
  const handleOnDeleteClick = (rid) => {
    dispatch(deleteRecipeAsync(rid));
  };

  return (
    <Card sx={{
      minWidth: '280px',
      maxWidth: '345px',
      margin: '8px',
    }}
    >
      <CardHeader
        avatar={showAvatar ? (
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        ) : null}
        title={recipe.dish_name}
        subheader={dayjs(recipe.create_date).format('MMMM D, YYYY')}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="https://placeimg.com/640/480/any"
        alt="Paella dish"
      /> */}
      <Box
        sx={{
          height: 194,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            fontSize: 32,
          }}
        >
          Picture
        </p>
      </Box>
      <CardContent>
        <Typography variant="subtitle1">
          {
          `Cooking Time: ${recipe.cooking_time}`
        }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {
          recipe.description
        }
        </Typography>
      </CardContent>
      {allowedEdited && user_id == recipe.author_id
    && (
    <CardActions
      disableSpacing
      sx={{
        display: 'flex',
        flexDirection: 'row-reverse',
      }}
    >
      <IconButton
        onClick={() => handleOnDeleteClick(recipe.recipe_id)}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        onClick={() => handleOnEditClick(recipe.recipe_id)}
        aria-label="edit"
      >
        <EditIcon />
      </IconButton>
    </CardActions>
    )}
    </Card>
  );
};
export default RecipeCard;
