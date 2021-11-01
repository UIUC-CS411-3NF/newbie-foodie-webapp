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

const RecipeCard = ({
  ShowAvatar,
}) => (
  <Card sx={{
    minWidth: '280px',
    maxWidth: '345px',
    margin: '8px',
  }}
  >
    <CardHeader
      avatar={ShowAvatar ? (
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          R
        </Avatar>
      ) : null}
      title="Shrimp and Chorizo Paella"
      subheader="September 14, 2016"
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
      <Typography variant="body2" color="text.secondary">
        This impressive paella is a perfect party dish and a fun meal to cook
        together with your guests. Add 1 cup of frozen peas along with the mussels,
        if you like.
      </Typography>
    </CardContent>
    <CardActions
      disableSpacing
      sx={{
        display: 'flex',
        flexDirection: 'row-reverse',
      }}
    >
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label="edit">
        <EditIcon />
      </IconButton>
    </CardActions>
  </Card>
);
export default RecipeCard;
