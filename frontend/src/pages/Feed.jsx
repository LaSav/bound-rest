import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  getFeed,
  resetFeed,
  searchFeed,
  sortFeed,
  stageLoading,
} from '../features/feed/feedSlice';
import FeedItem from '../components/FeedItem';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import Spinner from '../components/Spinner';

function Feed() {
  const dispatch = useDispatch();

  const { listings, isLoading, isError, message, page } = useSelector(
    (state) => state.feed
  );

  const [sortTerm, setSortTerm] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  console.log(listings.length);
  console.log('search term', searchTerm);
  console.log('page', page);
  console.log('sort term', sortTerm);

  const handleSearch = (e) => {
    e.preventDefault();
    setSortTerm('');
    dispatch(resetFeed());
    dispatch(searchFeed({ query: searchTerm, page: 1 }));
  };

  const handleSort = (event, newTerm) => {
    setSortTerm(newTerm);
    setSearchTerm('');
    dispatch(resetFeed());
    dispatch(sortFeed({ requiredSkill: newTerm, page: 1 }));
  };

  const getMoreListings = (sortTerm, searchTerm) => {
    if (sortTerm) {
      dispatch(sortFeed({ requiredSkill: sortTerm, page: page }));
    } else if (searchTerm) {
      dispatch(searchFeed({ query: searchTerm, page: page }));
    } else {
      dispatch(getFeed({ page: page }));
    }
  };

  // Fetch all listings on component mount
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getFeed({ page: page }));
  }, [dispatch, message]);

  // Cleanup
  useEffect(() => {
    return () => {
      dispatch(resetFeed());
    };
  }, [dispatch]);

  const content = listings.map((listing) => {
    return <FeedItem key={listing._id} listing={listing} />;
  });

  return (
    <>
      <Container maxWidth='lg'>
        <Grid container spacing={5}>
          <Grid item xs={3}>
            <Stack spacing={3}>
              <label htmlFor='searchTerm'>Filter:</label>
              <ToggleButtonGroup
                orientation='vertical'
                value={sortTerm}
                exclusive
                onChange={handleSort}
              >
                <ToggleButton
                  value='fullstack developer'
                  variant='outlined'
                  color='secondary'
                >
                  Fullstack Developer
                </ToggleButton>
                <ToggleButton
                  value='frontend developer'
                  variant='outlined'
                  color='secondary'
                >
                  Front-End Developer
                </ToggleButton>
                <ToggleButton
                  value='backend developer'
                  variant='outlined'
                  color='secondary'
                >
                  Back-End Developer
                </ToggleButton>
                <ToggleButton
                  value='UX designer'
                  variant='outlined'
                  color='secondary'
                >
                  UX Designer
                </ToggleButton>
                <ToggleButton
                  value='copywriter'
                  variant='outlined'
                  color='secondary'
                >
                  Copywriter
                </ToggleButton>
              </ToggleButtonGroup>
              <form noValidate autoComplete='off' onSubmit={handleSearch}>
                <TextField
                  label='search'
                  onChange={(e) => setSearchTerm(e.target.value)}
                >
                  Search
                </TextField>
                <Button variant='outlined' color='secondary' type='submit'>
                  Search
                </Button>
              </form>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack spacing={2}>{content}</Stack>
          </Grid>
        </Grid>
        {isLoading ? (
          <Spinner />
        ) : (
          <Button
            variant='secondary'
            onClick={() => {
              getMoreListings(sortTerm, searchTerm);
            }}
          >
            Get More Results
          </Button>
        )}
      </Container>
    </>
  );
}

export default Feed;
