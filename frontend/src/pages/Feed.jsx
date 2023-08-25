import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFeed, resetFeed } from '../features/feed/feedSlice';
import Spinner from '../components/Spinner';
import FeedItem from '../components/FeedItem';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';

function Feed() {
  const dispatch = useDispatch();

  const { listings, isLoading, isError, message } = useSelector(
    (state) => state.feed
  );

  // const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getFeed());
  }, [isError, message, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetFeed());
    };
  }, [dispatch]);

  // const filteredListings = listings.filter((listing) => {
  //   return listing.requiredSkill
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase());
  // });

  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  if (isLoading) {
    return <Spinner />;
  }

  const content = listings.map((listing) => {
    return <FeedItem key={listing._id} listing={listing} />;
  });

  return (
    <>
      <Container maxWidth='md'>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Stack spacing={3}>
              <label htmlFor='searchTerm'>Filter:</label>
              <FormControlLabel
                control={<Checkbox color='secondary' value='all' />}
                label='all'
              />
              <FormControlLabel
                control={
                  <Checkbox color='secondary' value='fullstack developer' />
                }
                label='Fullstack Developer'
              />
              <FormControlLabel
                control={
                  <Checkbox color='secondary' value='frontend developer' />
                }
                label='Frontend Developer'
              />
              <FormControlLabel
                control={
                  <Checkbox color='secondary' value='backend developer' />
                }
                label='Backend Developer'
              />
              <FormControlLabel
                control={<Checkbox color='secondary' value='UX designer' />}
                label='UX Designer'
              />
              <FormControlLabel
                control={<Checkbox color='secondary' value='copywriter' />}
                label='Copywriter'
              />
            </Stack>
          </Grid>
          <Grid item xs={10}>
            <Stack spacing={2}>{content}</Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Feed;
