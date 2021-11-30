import {
  Divider, IconButton, Rating, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const ReviewCard = ({
  review,
  deleteButtonShow,
  handleOnDeleteClick,
}) => (
  <Box
    sx={{
      mt: '32px',
      mb: '32px',

      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      borderRadius: '5px',
      padding: '8px',
      transition: '0.3s',
      ':hover': {
        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
      },
    }}
  >
    <Typography
      variant="h6"
    >
      {`user id ${review?.user_id}`}
    </Typography>
    <Typography variant="subtitle1">
      {dayjs(review.last_update_date).format('MMMM D, YYYY')}
    </Typography>
    <Rating name="half-rating-read" value={review.rate} precision={0.5} readOnly />
    <Typography
      variant="body1"
    >
      {review.comment}
    </Typography>
    {deleteButtonShow
   && (
   <Box
     sx={{
       width: '100%',
       display: 'flex',
     }}
   >
     <Box sx={{ flex: 1 }} />
     <IconButton
       sx={{
         width: '32px',
         height: '32px',
       }}
       onClick={handleOnDeleteClick}
     >
       <DeleteIcon />
     </IconButton>
   </Box>
   )}
  </Box>
);

export default ReviewCard;

// comment: "z599i"
// create_date: "2063-08-05T00:51:49.000Z"
// last_update_date: "2082-11-05T12:45:44.000Z"
// rate: 3
// status_id: 2
// user_id: 3
// user_review_recipe_id: 87
