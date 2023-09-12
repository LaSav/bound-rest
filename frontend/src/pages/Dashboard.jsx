import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ListingForm from '../components/ListingForm';
import { reset } from '../features/listings/listingSlice';
import Spinner from '../components/Spinner';
import { getUser, editUser, resetUser } from '../features/user/userSlice';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActions, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import Listings from '../components/Listings';
import EditToggle from '../components/EditToggle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import RequestedToggle from '../components/RequestedToggle';
import { getRequested, getMatched } from '../features/listings/listingSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { profile, isComplete, isError, message, isLoading } = useSelector(
    (state) => state.user
  );
  const { deleteListingMessage } = useSelector((state) => state.listing);

  const [formData, setFormData] = useState({
    bio: '',
    offeredSkill: 'fullstack developer',
    portfolio: '',
  });

  const { bio, offeredSkill, portfolio } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      bio,
      offeredSkill,
      portfolio,
    };
    dispatch(editUser(userData));
    navigate('/');
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getUser());
    dispatch(getMatched());
    dispatch(getRequested());
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Resets state when navigating away from Dashboard page
  useEffect(() => {
    return () => {
      // This one resets the listings
      dispatch(reset());
      dispatch(resetUser());
    };
  }, [dispatch]);

  if (isComplete || user?.profileCompleted) {
    return (
      <>
        <Container>
          <div>{deleteListingMessage && <p>{deleteListingMessage}</p>}</div>
          <Grid container spacing={2}>
            <Grid item xs={12} display='flex' alignItems='center'>
              <Box padding={2}>
                <Typography variant='h3' gutterBottom>
                  Welcome {user && user.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Card
                elevation={0}
                sx={{
                  backgroundColor: 'primary.main',
                }}
              >
                <CardContent>
                  <EditToggle profile={profile} isLoading={isLoading} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={8}>
              <Box padding={2}>
                <Typography variant='h4' color='secondary' gutterBottom>
                  Create a New Listing
                </Typography>
                <ListingForm />
              </Box>
            </Grid>
            <Grid item display='flex' xs={6}>
              <Box padding={2}>
                <Typography variant='h5'>Your Active Listings:</Typography>
                <Listings />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box padding={2}>
                <RequestedToggle />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  } else {
    if (isLoading) {
      return <Spinner />;
    }
    return (
      <>
        <Container maxWidth='sm'>
          <Typography variant='h4' gutterBottom>
            {profile.name} Complete Your Profile
          </Typography>
          <form noValidate autoComplete='off' onSubmit={onSubmit}>
            <Stack spacing={2}>
              <TextField
                type='text'
                id='bio'
                name='bio'
                value={bio}
                label='Create a bio'
                variant='outlined'
                multiline
                rows={5}
                fullWidth
                placeholder='Tell us about yourself'
                onChange={onChange}
              />
              <Typography variant='h6' color='secondary'>
                Select a skill you specialize in
              </Typography>
              <Select
                name='offeredSkill'
                id='offeredSkill'
                fullWidth
                value={offeredSkill}
                onChange={onChange}
              >
                <MenuItem value='fullstack developer'>
                  Fullstack developer
                </MenuItem>
                <MenuItem value='frontend developer'>
                  Frontend developer
                </MenuItem>
                <MenuItem value='backend developer'>Backend developer</MenuItem>
                <MenuItem value='UX designer'>UX designer</MenuItem>
                <MenuItem value='copywriter'>Copywriter</MenuItem>
              </Select>
              <TextField
                variant='outlined'
                type='url'
                id='portfolio'
                name='portfolio'
                value={portfolio}
                label='Enter your portfolio URL'
                onChange={onChange}
              />
              <Button
                type='submit'
                variant='outlined'
                color='success'
                fullWidth
                startIcon={<DoneIcon />}
              >
                Save
              </Button>
            </Stack>
          </form>
        </Container>
      </>
    );
  }
}

export default Dashboard;
