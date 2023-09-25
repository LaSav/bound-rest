import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  getFeed,
  resetFeed,
  searchFeed,
  sortFeed,
} from '../features/feed/feedSlice';
import FeedItem from '../components/FeedItem';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
    setSortTerm('All Listings');
    dispatch(resetFeed());
    dispatch(searchFeed({ query: searchTerm, page: 1 }));
  };

  const handleSort = (term) => {
    if (term === '') {
      dispatch(resetFeed());
      dispatch(getFeed({ page: 1 }));
    }
    setSortTerm(term);
    setSearchTerm('');
    dispatch(resetFeed());
    dispatch(sortFeed({ requiredSkill: term, page: 1 }));
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

    dispatch(getFeed({ page: 1 }));
  }, [dispatch, message, isError]);

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
        <Grid container spacing={5} justifyContent='center'>
          <Grid item xs={9}>
            <Stack spacing={3} direction='row' justifyContent='between'>
              <Select
                name='requiredSkill'
                id='requiredSkill'
                value={sortTerm}
                label='Select the Skill required for this listing'
                onChange={(e) => handleSort(e.target.value)}
              >
                <MenuItem value=''>All Listings</MenuItem>
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
