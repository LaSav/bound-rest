import Spinner from '../components/Spinner';
// import UserProfile from '../components/UserProfile';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById, resetUser } from '../features/user/userSlice';
import { Stack } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Button } from '@mui/material';

function ShowUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { profile, isLoading, isError, message } = useSelector(
    (state) => state.user
  );
  const { userId } = useParams();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }
    dispatch(getUserById(userId));
  }, [user, navigate, isError, message, dispatch, userId]);

  useEffect(() => {
    return () => {
      dispatch(resetUser());
    };
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Stack spacing={1} justifyContent='center'>
      <Typography variant='p'>{profile.name}</Typography>
      <Typography variant='p'>{profile.email}</Typography>
      <Typography variant='p'>{profile.bio}</Typography>
      <Typography variant='p'>{profile.offeredSkill}</Typography>
      <Typography variant='p'>{profile.portfolio}</Typography>
    </Stack>
  );
}

export default ShowUser;
