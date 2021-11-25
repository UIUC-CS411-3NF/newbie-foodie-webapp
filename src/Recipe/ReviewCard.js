import { Divider, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const ReviewCard = ({
  review,
}) => (
  <Box
    sx={{
      m: '16px',
    }}
  >
    <Typography
      variant="h6"
    >
      Peter
    </Typography>
    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
    <Typography
      variant="body1"
    >
      Adipisicing ad adipisicing id nisi minim officia. Enim sit laborum incididunt laboris consequat sunt enim magna fugiat ea ea magna qui proident. Eu esse magna occaecat pariatur esse sit. Pariatur consectetur in consequat culpa veniam reprehenderit aliquip. Ea ea dolore esse eu nostrud sit. Cupidatat tempor elit nisi proident duis est. Ex aliqua culpa aute excepteur magna ipsum sunt enim ullamco consectetur voluptate.
    </Typography>
  </Box>
);

export default ReviewCard;
