import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const IngredientCard = ({
  ingredient,
}) => (
  <Box>
    <Typography
      variant="h6"
    >
      {`${ingredient.name}   ${ingredient.amount}`}
    </Typography>
  </Box>
);

export default IngredientCard;
