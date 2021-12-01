import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { getTopActiveMemberAsync } from '../features/recipe/recipeSlice';

function stringAvatar(name) {
  return {
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const BadgeAvatars = () => {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipe);
  useEffect(() => {
    dispatch(getTopActiveMemberAsync(''));
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
    <h1>Top Active Members</h1>
    <Stack component="div"  direction="row" spacing={2}>
        {
          recipe.topActiveMember && recipe.topActiveMember.map((item, index) => (
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
              <Avatar
              sx={{ width: 22,
              height: 22,
              border: `2px solid`}}
              style={{
                backgroundColor: '#1776D2',
              }} 
              >{index+1}</Avatar>
              
            }
            >
              <Avatar 
                sx={{ width: 56, height: 56 }} 
                style={{
                  backgroundColor: '#1776D2',
                }} 
              >{item.username}</Avatar>
            </Badge>
          ))
        }
    </Stack>
    </div>
  );
};
export default BadgeAvatars;