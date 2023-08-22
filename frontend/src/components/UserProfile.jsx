import Spinner from './Spinner';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function UserProfile({ profile, isLoading, toggleEdit }) {
  if (isLoading) {
    return <Spinner />;
  } else
    return (
      <Stack spacing={1} justifyContent='center'>
        <Typography variant='h5'>Your Profile</Typography>

        <Typography variant='p'>{profile.name}</Typography>
        <Typography variant='p'>{profile.email}</Typography>
        <Typography variant='p'>{profile.bio}</Typography>
        <Typography variant='p'>{profile.offeredSkill}</Typography>
        <Typography variant='p'>{profile.portfolio}</Typography>

        <Box>
          <Button variant='outlined' color='secondary' onClick={toggleEdit}>
            Edit
          </Button>
        </Box>
      </Stack>
    );
}

export default UserProfile;
