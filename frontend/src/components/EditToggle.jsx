import UserForm from './UserForm';
import UserProfile from './UserProfile';
import { useState } from 'react';
import Button from '@mui/material/Button';

function EditToggle({ profile, isLoading }) {
  const [showProfile, setShowProfile] = useState(true);

  const toggleEdit = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div>
      {showProfile ? (
        <UserProfile
          profile={profile}
          isLoading={isLoading}
          toggleEdit={toggleEdit}
        />
      ) : (
        <UserForm
          profile={profile}
          isLoading={isLoading}
          toggleEdit={toggleEdit}
        />
      )}
    </div>
  );
}

export default EditToggle;
