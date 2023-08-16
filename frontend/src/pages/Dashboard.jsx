import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ListingForm from '../components/ListingForm';
import { getListings, reset } from '../features/listings/listingSlice';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';
import { getUser, editUser, resetUser } from '../features/user/userSlice';
import UserProfile from '../components/UserProfile';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActions, CardContent } from '@mui/material';
import Button from '@mui/material/Button';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { profile, isComplete } = useSelector((state) => state.user);

  const { listings, isLoading, isError, message } = useSelector(
    (state) => state.listings
  );

  const [formData, setFormData] = useState({
    bio: '',
    offeredSkill: 'fullstack developer',
    portfolio: null ? '' : profile.portfolio,
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
    dispatch(getListings());
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      dispatch(reset());
      dispatch(resetUser());
    };
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isComplete || user?.profileCompleted) {
    return (
      <>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={7} display='flex' alignItems='center'>
              <Box padding={2}>
                <Typography variant='h3' gutterBottom>
                  Welcome {user && user.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item display='flex' justifyContent='center' xs={5}>
              <Card
                elevation={0}
                sx={{
                  backgroundColor: 'primary.main',
                }}
              >
                <CardContent>
                  <h3>Your Profile</h3>
                  <UserProfile profile={profile} />
                </CardContent>
                <CardActions>
                  <Link to={'edit-profile'}>
                    <Button variant='outlined' color='secondary'>
                      Edit
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Box padding={2}>
                <Typography variant='h4' color='secondary' gutterBottom>
                  Create a New Listing
                </Typography>
                <ListingForm />
              </Box>
            </Grid>
            <Grid item display='flex' justifyContent='center' xs={6}>
              <Box padding={2}>
                <Typography variant='h5'>Your Active Listings:</Typography>
                <section className='user-listings'>
                  {listings.length > 0 ? (
                    <div className='listings'>
                      {listings.map((listing) => (
                        <ListingItem key={listing._id} listing={listing} />
                      ))}
                    </div>
                  ) : (
                    <h3>You haven't made any Listings yet</h3>
                  )}
                </section>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box padding={2}>
                <Typography variant='h5'>Requested to:</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <section className='heading'>
          <h1>{profile.name} Complete Your Profile</h1>
        </section>
        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='bio'
                name='bio'
                value={bio}
                placeholder='Create a bio'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='offeredSkill'>Select a Skill</label>
              <select
                name='offeredSkill'
                id='offeredSkill'
                value={offeredSkill}
                onChange={onChange}
              >
                <option value='fullstack developer'>Fullstack developer</option>
                <option value='frontend developer'>Frontend developer</option>
                <option value='backend developer'>Backend developer</option>
                <option value='UX designer'>UX designer</option>
                <option value='copywriter'>Copywriter</option>
              </select>
            </div>
            <div className='form-group'>
              <input
                type='url'
                className='form-control'
                id='portfolio'
                name='portfolio'
                value={portfolio}
                placeholder='Enter your portfolio URL'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <button type='submit' className='btn btn-block'>
                Save
              </button>
            </div>
          </form>
        </section>
      </>
    );
  }
}

export default Dashboard;
