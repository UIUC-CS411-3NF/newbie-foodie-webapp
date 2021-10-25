import { Button } from '@mui/material';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();
  const handleCreateClick = () => {
    history.push('/recipe/create');
  };
  return (
    <div>
      <p>Profile</p>
      <Button
        onClick={handleCreateClick}
      >
        Create New Recipe
      </Button>
    </div>
  );
};

export default Profile;
